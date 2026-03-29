import os
import sys
# Add the py_zerox directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '../py_zerox'))

import warnings
from typing import Optional, List, Dict, Any
import asyncio
import traceback
import json
from pathlib import Path
import logging
from dotenv import load_dotenv
load_dotenv()

# Suppress Pydantic warning about fields config
warnings.filterwarnings('ignore', message='Valid config keys have changed in V2.*')
  
from aiohttp import web, MultipartReader, BodyPartReader
import re
import logging
from pyzerox import zerox

# Apply logging patch to prevent recursion errors
def apply_logging_patch():
    """
    Apply a patch to prevent recursion errors in the logging module.
    This addresses issues with PyPDF2's logging causing recursion errors.
    """
    import logging
    
    # Store the original function
    original_is_internal_frame = logging._is_internal_frame
    
    # Create a safer version that won't recurse indefinitely
    def safer_is_internal_frame(frame):
        try:
            # Get the filename safely with error handling
            try:
                filename = frame.f_code.co_filename
                if not filename:
                    return False
                
                # Use a simple string check instead of os.path operations
                return 'logging' in filename and 'importlib' not in filename
            except Exception:
                # If anything goes wrong, just return False
                return False
        except Exception:
            # Extra safety in case the frame access itself fails
            return False
    
    # Replace the function
    logging._is_internal_frame = safer_is_internal_frame
    
    # Also patch the findCaller function in logging to avoid potential recursion
    original_findCaller = logging.Logger.findCaller
    
    def safer_findCaller(self, stack_info=False, stacklevel=1):
        try:
            return original_findCaller(self, stack_info, stacklevel)
        except RecursionError:
            # If we hit recursion, return default values
            return "(unknown file)", 0, "(unknown function)", None
    
    # Apply the patch
    logging.Logger.findCaller = safer_findCaller

# Apply the patch at the top
apply_logging_patch()

# Configure logging
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

# Configuration
TEMP_DIR = "/tmp/zerox"
OUTPUT_DIR = "./output"
model = os.getenv("MODEL", "gpt-4o-mini")

def transform_to_kebab_case(text: str) -> str:
    """Convert text to kebab case."""
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    text = re.sub(r'\s', '-', text)
    text = re.sub(r'[^a-z0-9-]', '', text)
    text = re.sub(r'-+', '-', text)
    return text

async def extract_pdf_text_with_fallback(file_path: str, select_pages: Optional[List[int]] = None) -> List[dict]:
    """
    Extract text from PDF using multiple methods as fallback.
    Returns a list of pages with text content.
    """
    logger.info(f"Attempting to extract text from PDF using fallback methods: {file_path}")
    
    # Try to import PyPDF2
    try:
        import PyPDF2
    except ImportError:
        logger.error("PyPDF2 not installed, cannot use primary extraction method")
        raise web.HTTPInternalServerError(text="PDF processing library not available")
    
    # Storage for extracted pages
    extracted_pages = []
    
    # First try with PyPDF2
    try:
        logger.info("Attempting extraction with PyPDF2")
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            total_pages = len(reader.pages)
            
            # Determine which pages to process
            pages_to_process = select_pages if select_pages else list(range(1, total_pages + 1))
            
            # Ensure pages are within range (PyPDF2 uses 0-indexing, but our API uses 1-indexing)
            pages_to_process = [p for p in pages_to_process if 1 <= p <= total_pages]
            
            for page_num in pages_to_process:
                # PyPDF2 uses 0-indexed pages, so subtract 1
                page = reader.pages[page_num - 1]
                text = page.extract_text()
                
                extracted_pages.append({
                    "page": page_num,
                    "content": text if text else "",
                    "contentLength": len(text) if text else 0
                })
            
            logger.info(f"Successfully extracted {len(extracted_pages)} pages with PyPDF2")
            return extracted_pages
    except Exception as e:
        logger.error(f"PyPDF2 extraction failed: {e}", exc_info=True)
    
    # If all methods fail
    if not extracted_pages:
        raise web.HTTPInternalServerError(
            text="Failed to extract text from PDF with all available methods"
        )
    
    return extracted_pages

async def parse_input(
    file_path: str, 
    select_pages: Optional[List[int]] = None, 
    schema: Optional[Dict[str, Any]] = None, 
    extract_per_page: bool = False, 
    extract_only: bool = False,
    custom_prompt: Optional[str] = None,
    generation_id: Optional[str] = None
) -> dict:
    """Parse input file using zerox with enhanced error handling."""
    try:
        stats = os.stat(file_path)
        logger.info(f"Parsing file: {file_path}, size: {stats.st_size}, select_pages: {select_pages}, schema: {schema is not None}")

        has_key = (
            os.environ.get("OPENAI_API_KEY")
            or os.environ.get("DEEPSEEK_API_KEY")
            or os.environ.get("GEMINI_API_KEY")
        )
        if not has_key:
            raise ValueError("No LLM API key set (OPENAI_API_KEY, DEEPSEEK_API_KEY, or GEMINI_API_KEY)")
        
        # Set a higher recursion limit
        original_limit = sys.getrecursionlimit()
        logger.info(f"Current recursion limit: {original_limit}")
        
        try:
            # Significantly increase the limit
            new_limit = 10000
            sys.setrecursionlimit(new_limit)
            logger.info(f"Increased recursion limit to {new_limit}")
            
            # Only include schema-related parameters if schema is provided
            zerox_params = {
                "file_path": file_path,
                "model": model,
                "output_dir": OUTPUT_DIR,
                "cleanup": True,
                "select_pages": select_pages,
                "generation_id": generation_id
            }

            # Add custom prompt if provided
            if custom_prompt is not None:
                zerox_params["custom_system_prompt"] = custom_prompt

            # Add schema-related parameters only if schema is provided
            if schema is not None:
                zerox_params.update({
                    "schema": schema,
                })
            
            # Try with zerox with updated parameters
            result = await zerox(**zerox_params)
            logger.info(f"Successfully parsed file with zerox: {file_path}")
            return result
            
        except RecursionError as re:
            logger.error(f"RecursionError in zerox: {re}", exc_info=True)
            # Use fallback extraction
            pages = await extract_pdf_text_with_fallback(file_path, select_pages)
            
            # Create a zerox-like response structure
            result = {
                "fileName": os.path.basename(file_path),
                "pages": pages,
                "inputTokens": sum(page["contentLength"] for page in pages) // 4,  # Rough estimate
                "outputTokens": 0,
                "completionTime": 0,
                "extracted": None,  # Add extracted field
                "summary": {
                    "total_pages": len(pages),
                    "ocr": {
                        "successful": len(pages),
                        "failed": 0
                    },
                    "extracted": None
                }
            }
            logger.info(f"Used fallback extraction method for {file_path}")
            return result
            
        except Exception as e:
            error_lower = str(e).lower()
            use_fallback = (
                "recursion" in error_lower
                or "not a vision model" in error_lower
                or "nonavisionmodel" in error_lower
                or "notavisionmodel" in error_lower
            )
            if use_fallback:
                logger.warning(f"Zerox model unavailable ({e}), falling back to PyPDF2 text extraction")
                pages = await extract_pdf_text_with_fallback(file_path, select_pages)
                
                result = {
                    "fileName": os.path.basename(file_path),
                    "pages": pages,
                    "inputTokens": sum(page["contentLength"] for page in pages) // 4,
                    "outputTokens": 0,
                    "completionTime": 0,
                    "extracted": None,
                    "summary": {
                        "total_pages": len(pages),
                        "ocr": {
                            "successful": len(pages),
                            "failed": 0
                        },
                        "extracted": None
                    }
                }
                logger.info(f"Used fallback extraction method for {file_path}")
                return result
            else:
                raise
                
        finally:
            # Restore original recursion limit
            sys.setrecursionlimit(original_limit)
            logger.info(f"Restored recursion limit to {original_limit}")
            
    except Exception as e:
        logger.error(f"Error parsing file: {e}", exc_info=True)
        error_str = str(e).lower()

        # Vision model unavailable — fall back to PyPDF2
        if "not a vision model" in error_str or "notavisionmodel" in error_str:
            logger.warning(f"Vision model unavailable, using PyPDF2 fallback: {e}")
            try:
                pages = await extract_pdf_text_with_fallback(file_path, select_pages)
                result = {
                    "fileName": os.path.basename(file_path),
                    "pages": pages,
                    "inputTokens": sum(page["contentLength"] for page in pages) // 4,
                    "outputTokens": 0,
                    "completionTime": 0,
                    "extracted": None,
                    "summary": {
                        "total_pages": len(pages),
                        "ocr": {"successful": len(pages), "failed": 0},
                        "extracted": None,
                    },
                }
                return result
            except Exception as fallback_err:
                logger.error(f"PyPDF2 fallback also failed: {fallback_err}")
                raise web.HTTPInternalServerError(text=f"Vision model unavailable and PyPDF2 fallback failed: {fallback_err}")

        if "recursion" in error_str:
            raise web.HTTPBadRequest(
                text="The PDF structure is too complex. Please try a simpler PDF or reduce the number of pages selected."
            )
        elif "password" in error_str or "encrypted" in error_str:
            raise web.HTTPBadRequest(
                text="The PDF file is password protected or encrypted. Please remove the password protection and try again."
            )
        elif "pdf" in error_str and ("invalid" in error_str or "corrupt" in error_str or "damaged" in error_str):
            raise web.HTTPBadRequest(
                text="The PDF file appears to be damaged or corrupted. Please check the file and try again."
            )
        else:
            raise web.HTTPInternalServerError(text=str(e))

async def cleanup_temp_file(file_path: str) -> None:
    """Clean up temporary file."""
    try:
        if file_path and os.path.exists(file_path):
            os.unlink(file_path)
            logger.debug(f"Cleaned up temp file: {file_path}")
    except Exception as e:
        logger.error(f"Error cleaning up temp file: {e}", exc_info=True)

def to_dict(obj):
    """Convert object to dictionary for JSON serialization."""
    if hasattr(obj, '__dict__'):
        return obj.__dict__
    return obj

async def handle_parse(request):
    """Handle file upload and parsing."""
    try:
        logger.info(f"Received request: {request.headers.get('Content-Type')}")
        
        if not request.content_type or not request.content_type.startswith('multipart/'):
            logger.error(f"Invalid content type: {request.content_type}")
            raise web.HTTPBadRequest(text="Content-Type must be multipart/form-data")
        
        # Create temporary directory if it doesn't exist
        os.makedirs(TEMP_DIR, exist_ok=True)
        
        reader = MultipartReader.from_response(request)
        
        file_part = None
        select_pages = None
        schema = None
        extract_per_page = False
        extract_only = False
        custom_prompt = None
        generation_id = None
        file_data = None
        file_name = None
        
        # Process each part of the multipart form
        async for part in reader:
            if isinstance(part, BodyPartReader):
                name = part.name
                logger.info(f"Processing part: {name}")
                
                if name == 'file':
                    file_name = part.filename
                    file_data = await part.read(decode=False)
                    
                elif name == 'select_pages':
                    select_pages_value = await part.text()
                    try:
                        if ',' in select_pages_value:
                            select_pages = [int(x.strip()) for x in select_pages_value.split(',')]
                        else:
                            select_pages = [int(select_pages_value.strip())]
                    except ValueError as e:
                        raise web.HTTPBadRequest(text=f"Invalid select_pages format: {str(e)}")
                
                elif name == 'schema':
                    try:
                        schema_text = await part.text()
                        # Only parse schema if it's not empty
                        if schema_text and schema_text.strip():
                            schema = json.loads(schema_text)
                        else:
                            schema = None
                    except json.JSONDecodeError as e:
                        raise web.HTTPBadRequest(text=f"Invalid schema JSON: {str(e)}")
                
                elif name == 'extract_per_page':
                    extract_per_page = (await part.text()).lower() == 'true'
                
                elif name == 'extract_only':
                    extract_only = (await part.text()).lower() == 'true'
                
                elif name == 'custom_prompt':
                    custom_prompt_text = await part.text()
                    if custom_prompt_text and custom_prompt_text.strip():
                        custom_prompt = custom_prompt_text.strip()
                    else:
                        custom_prompt = None
                        
                elif name == 'generation_id':
                    generation_id_text = await part.text()
                    if generation_id_text and generation_id_text.strip():
                        generation_id = generation_id_text.strip()
                    else:
                        generation_id = None
        
        if not file_data or not file_name:
            raise web.HTTPBadRequest(text="No file provided or file is empty")
        
        # Create temp file path
        file_stem = Path(file_name).stem
        file_ext = Path(file_name).suffix
        temp_file_path = Path(TEMP_DIR) / f"upload_{transform_to_kebab_case(file_stem)}_{id(file_data)}{file_ext}"
        
        try:
            with open(temp_file_path, "wb") as f:
                f.write(file_data)
            
            file_size = os.path.getsize(temp_file_path)
            if file_size == 0:
                raise web.HTTPBadRequest(text="File is empty")
            
            # Process file with updated parameters including generation_id
            result = await parse_input(
                str(temp_file_path),
                select_pages=select_pages,
                schema=schema,
                extract_per_page=extract_per_page,
                extract_only=extract_only,
                custom_prompt=custom_prompt,
                generation_id=generation_id
            )
            response_data = json.loads(json.dumps(result, default=to_dict))
            return web.json_response(response_data)
            
        finally:
            if temp_file_path:
                await cleanup_temp_file(str(temp_file_path))
            
    except Exception as e:
        logger.error(f"Unhandled exception in handle_parse: {e}", exc_info=True)
        if isinstance(e, web.HTTPException):
            raise
        raise web.HTTPInternalServerError(text=str(e))

async def handle_options(request):
    """Handle CORS preflight requests."""
    return web.Response(status=200)

# Simple test endpoint to upload a PDF
async def handle_upload_test(request):
    """Test endpoint with a simple HTML form for uploading PDFs."""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>PDF Upload Test</title>
        <style>
            .form-group {
                margin-bottom: 1rem;
            }
            textarea {
                width: 100%;
                max-width: 500px;
            }
        </style>
    </head>
    <body>
        <h1>PDF Upload Test</h1>
        <form action="/parse" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="file">Select PDF:</label>
                <input type="file" id="file" name="file" accept=".pdf" required>
            </div>
            <div class="form-group">
                <label for="select_pages">Select Pages (comma separated, e.g., 1,2,3):</label>
                <input type="text" id="select_pages" name="select_pages">
            </div>
            <div class="form-group">
                <label for="custom_prompt">Custom System Prompt (optional):</label>
                <textarea id="custom_prompt" name="custom_prompt" rows="3" 
                    placeholder="Enter custom system prompt for the model..."></textarea>
            </div>
            <div class="form-group">
                <label for="schema">Schema (JSON, optional):</label>
                <textarea id="schema" name="schema" rows="4" 
                    placeholder='Example: {"type": "object", "properties": {...}}'></textarea>
            </div>
            <div class="form-group">
                <label for="extract_per_page">Extract per page:</label>
                <input type="checkbox" id="extract_per_page" name="extract_per_page" value="true">
            </div>
            <div class="form-group">
                <label for="extract_only">Extract only (skip OCR):</label>
                <input type="checkbox" id="extract_only" name="extract_only" value="true">
            </div>
            <div class="form-group">
                <button type="submit">Upload and Parse</button>
            </div>
        </form>
    </body>
    </html>
    """
    return web.Response(text=html, content_type='text/html')

async def health_check(request):
    """Health check endpoint."""
    return web.json_response({"status": "healthy", "model": model})

def setup_cors(app):
    """Setup CORS headers."""
    async def cors_middleware(app, handler):
        async def middleware_handler(request):
            if request.method == 'OPTIONS':
                response = web.Response()
            else:
                response = await handler(request)
            
            response.headers.update({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '3600',
            })
            return response
        return middleware_handler
    app.middlewares.append(cors_middleware)

def create_app():
    app = web.Application(
        client_max_size=1024**2 * 50,  # 50MB max size
    )
    setup_cors(app)

    # Routes
    app.router.add_get('/health', health_check)
    app.router.add_get('/test', handle_upload_test)  # HTML test form
    app.router.add_post('/parse', handle_parse)
    app.router.add_options('/parse', handle_options)
    
    return app

if __name__ == "__main__":
    # Ensure directories exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)
    
    port = 3000
    logger.info(f"Starting server on port {port}")
    logger.info(f"Using temp directory: {TEMP_DIR}")
    logger.info(f"Using output directory: {OUTPUT_DIR}")
    logger.info(f"Using model: {model}")
    app = create_app()
    web.run_app(app, port=port)
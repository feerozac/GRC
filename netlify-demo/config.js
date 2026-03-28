/**
 * Runtime configuration for the Evonix prototype.
 *
 * On Netlify, set the environment variable EVONIX_API_BASE in the site
 * settings (e.g. https://your-platform.up.railway.app). The build script
 * injects it here. For local development, defaults to localhost:3000.
 */
window.EVONIX_API_BASE = '__EVONIX_API_BASE__';

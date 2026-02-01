const fs = require("fs");
const path = require("path");
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const outPath = path.join(__dirname, "images", "agentic-robotic-transform-slide.png");

if (fs.existsSync(outPath)) {
  console.log("Image already exists:", outPath);
  process.exit(0);
}

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-southeast-1";

const prompt = [
  "Create a cinematic, dark-theme corporate illustration.",
  "Focus on robotic figures working together to rapidly interpret complex information.",
  "Show data streams flowing into robots and being transformed into clear visual outputs.",
  "Visual outputs should feel like dashboards, documents, and process flow icons.",
  "Style: sleek neon accents (teal, blue, purple), high contrast, minimal clutter.",
  "Use a wide 16:9 composition with generous negative space.",
  "No text, no logos, no watermarks."
].join(" ");

async function main() {
  const client = new BedrockRuntimeClient({ region });

  const body = {
    taskType: "TEXT_IMAGE",
    textToImageParams: { text: prompt },
    imageGenerationConfig: {
      numberOfImages: 1,
      height: 1024,
      width: 1792,
      cfgScale: 8
    }
  };

  const command = new InvokeModelCommand({
    modelId: "amazon.titan-image-generator-v1",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(body)
  });

  const response = await client.send(command);
  const json = JSON.parse(Buffer.from(response.body).toString("utf8"));
  const b64 = json?.images?.[0];
  if (!b64) {
    throw new Error("Bedrock response missing image data.");
  }

  const buffer = Buffer.from(b64, "base64");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  console.log("Saved image:", outPath);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

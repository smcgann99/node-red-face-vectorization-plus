const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const modelUrls = {
  "facenet-model":
    "https://github.com/smcgann99/node-red-face-vectorization-plus/raw/main/model/facenet-model.onnx",
};

const downloadDir = path.join(__dirname, "model");

async function downloadModels() {
  try {
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    for (const modelName in modelUrls) {
      const modelUrl = modelUrls[modelName];
      const response = await axios.get(modelUrl, { responseType: "stream" });
      const modelPath = path.join(downloadDir, `${modelName}.onnx`);
      const fileStream = fs.createWriteStream(modelPath);
      response.data.pipe(fileStream);
      await new Promise((resolve, reject) => {
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
      });
      console.log(`Model file ${modelName}.onnx Download Complete`);
    }
  } catch (error) {
    console.error("Error downloading model file:", error);
  }
}

downloadModels();

const onnx = require("onnxruntime-node");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

let modelCache = null;

async function loadModel(modelPath) {
  if (!modelCache) {
    modelCache = await onnx.InferenceSession.create(modelPath);
  }
  return modelCache;
}

async function imageVectorization(inputData, model) {
  try {
    const inputName = model.inputNames[0];
    const inputDims = [1, 3, 224, 224];
    const input = await imageTransfer(inputData);
    const inputTensor = new onnx.Tensor(Float32Array.from(input), inputDims);
    const feeds = {};
    feeds[inputName] = inputTensor;
    const outputData = await model.run(feeds);

    return Array.from(outputData.output.data);
  } catch (error) {
    throw new Error("Image vectorization error: " + error.message.split("\n")[0]);
  }
}

async function imageTransfer(inputData) {
  try {
    const img = sharp(inputData);

    const pixels = await img
      .removeAlpha()
      .resize({ width: 224, height: 224, fit: "fill" })
      .raw()
      .toBuffer();

    const red = [],
      green = [],
      blue = [];

    for (let index = 0; index < pixels.length; index += 3) {
      red.push(pixels[index] / 255.0);
      green.push(pixels[index + 1] / 255.0);
      blue.push(pixels[index + 2] / 255.0);
    }

    const input = [...red, ...green, ...blue];

    return input;
  } catch (error) {
    throw new Error("Image transfer error: " + error.message.split("\n")[0]);
  }
}

module.exports = function (RED) {
  function FaceVectorizationNode(config) {
    RED.nodes.createNode(this, config);
    this.data = config.data || "";
    this.dataType = config.dataType || "msg";
    const node = this;
    let inputData;
    const currentDir = __dirname;
    const modelPath = path.join(currentDir, "model", "facenet-model.onnx");

    node.on("input", async function (msg) {
      RED.util.evaluateNodeProperty(node.data, node.dataType, node, msg, (err, value) => {
        if (err) {
          handleError(err, msg, "Invalid source");
          return;
        } else {
          inputData = value;
        }
      });

      try {
        const vectors = [];
        const model = await loadModel(modelPath);

        if (config.inputType == 0) {
          vectors.push(await imageVectorization(inputData, model));
        } else if (config.inputType == 1) {
          const promises = inputData.map(data => imageVectorization(data, model));
          const results = await Promise.all(promises);
          vectors.push(...results);
        }

        if (config.returnType == 0) {
          msg.payload = vectors;
          node.send(msg);
        } else if (config.returnType == 1) {
          const filePath = config.path;
          const textData = JSON.stringify(vectors);

          const dir = path.dirname(filePath);

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          if (config.method == 0) {
            fs.writeFileSync(filePath, textData, "utf-8");
          } else if (config.method == 1) {
            let existData = fs.readFileSync(filePath, "utf-8");
            const allData = JSON.parse(existData);
            allData.push(...vectors);
            fs.writeFileSync(filePath, JSON.stringify(allData), "utf-8");
          }
        }
      } catch (error) {
        node.error("An error occurred: " + error.message.split("\n")[0]);
      }
    });
  }

  RED.nodes.registerType("face-vectorization-plus", FaceVectorizationNode);
};

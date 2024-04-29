import { processImg } from "../processImg.js";

async function helperprocessImage(filePath, resolution) {
  return await processImg(filePath, resolution);
}

export { helperprocessImage };

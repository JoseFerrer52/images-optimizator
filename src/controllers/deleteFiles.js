import fs from "fs"
import path from "path";

async function deleteOldImagesOfOutput(directory, maxAge) {
    try {
      const files = await fs.promises.readdir(directory);
      const now = Date.now();
  
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.promises.stat(filePath);
  
        // Comprueba si el archivo es más antiguo que maxAge
        if (now - stats.mtimeMs > maxAge) {
          await fs.promises.unlink(filePath);
          console.log(`Eliminada imagen antigua: ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`Error al eliminar imágenes antiguas: ${error}`);
    }
  }

  // Función para eliminar imágenes antiguas
async function deleteOldImagesOfInput(inputPath, maxAge) {
    try {
      const files = await fs.promises.readdir(inputPath);
      const now = Date.now();
  
      for (const file of files) {
        const filePath = path.join(inputPath, file);
        const stats = await fs.promises.stat(filePath);
  
        // Comprueba si el archivo es más antiguo que maxAge
        if (now - stats.mtimeMs > maxAge) {
          await fs.promises.unlink(filePath);
          console.log(`Eliminada imagen antigua: ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`Error al eliminar imágenes antiguas: ${error}`);
    }
  }

export {deleteOldImagesOfOutput, deleteOldImagesOfInput}

  
import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import fs from "fs/promises";
import { deleteOldImages, deleteOldImagesOfInput } from "./deleteFiles.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
let outputFolder = join(__dirname, "../output");

const maxTime =  600000; //en esta variable defino el tiempo que se va a comparar con el de los archivos a elimininar

async function processImg(filePath, resolution) {
  try {
    /*"files" lee la ruta en donde se encuentra los objetos a iterar  */
    const files = await fse.readdir(`./${filePath}`);

    for (const file of files) {
      let inputPath = `${filePath}/${file}`;
      let outputPath = `${outputFolder}/${file}`;

      await sharp(inputPath)
        .resize(parseInt(resolution.split("x")[0]), parseInt(resolution.split("x")[1]))
        .toFile(outputPath, { onFinish: () => fs.close(filePath) });

      await imagemin([outputPath], {
        destination: outputFolder,
        plugins: [
          imageminJpegtran({
            quality: 80,
          }) /* Comprimir imagen JPG con calidad del 80% */,
          imageminPngquant() /* Comprimir imagen PNG */,
          imageminSvgo() /* Comprimir imagen SVGO */,
          //imageminWebp({quality: 80,}) /* Comprimir imagen con calidad del 80% */,
          imageminGifsicle() /* Comprimir imagen GIF */,
        ],
      });

      console.log(`se ha optimizado la imagen: ${file}`);
      
      // este setTimeout elimina la imagen original que ya no se necesita
      setTimeout(async () => {
        try {
           deleteOldImagesOfInput(filePath, maxTime);
          // Llama a la función para eliminar imágenes antiguas
           deleteOldImagesOfOutput(outputFolder, maxTime);

        } catch (error) {
          console.log("Ocurrió un error al eliminar la imagen:", error);
        }
      }, maxTime); // Espera  1 segundo antes de intentar eliminar el archivo

     
        
  
      

    }

    
  } catch (error) {
    console.log("ocurrio un error desde processImage:", error);
  }
}

export { processImg };

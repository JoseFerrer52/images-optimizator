import { Router } from "express";
import multer from "multer";
import { processImg } from "../controllers/processImg.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Carga las variables de entorno
dotenv.config();
const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Uso la variable de entorno para la ruta de destino
    cb(null, process.env.IMAGE_UPLOAD_PATH || "src/input/"); //en esta ruta se va a guardar la imagen completa
  },
  filename: (req, file, cb) => {
    const extent = file.originalname.split(".").pop(); // image.png ---> png
    cb(null, `${Date.now()}.${extent}`);
  },
});

const upload = multer({ storage: storage });

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml", // Corregido el tipo MIME para SVG
  "image/webp",
  "image/gif",
];

const allowedResolutions = [
  "1920x1080",
  "1280x720",
  "720x480",
  "426x240",
];

const allowedMaximumCharacters = /^[\s\S]{0,51}$/g

// la funcion helperprocessImage llama y ejecuta la funcion processImg donde se optimizara las imagenes
async function helperprocessImage(filePath, resolution) {
  return await processImg(filePath, resolution);
}

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Optimizador de imágenes" });
});
router.post("/", upload.single("file"), async (req, res) => {
  try {

    // valida el tipo de archivo
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).send("Formato de archivo inválido");
    }
    // Valida la resolución de la imagen
    if (!allowedResolutions.includes(req.body.resolution)) {
      return res.status(400).send("Formato de archivo inválido");
    }
    // Valida que el nombre de la imagen no sea tan largo
    if (allowedMaximumCharacters.test(req.file.originalname)) {
      return res.status(400).send("El nombre del archivo es muy largo")
    }

    console.log(req.file); // Verifica si req.file contiene la información del archivo
    console.log(req.body.resolution); // Verifica si req.body.uploadOption contiene el valor de enviado

    //aqui le paso como parametro lo que la ruta de destino de la imagen y la resolusion de la misma
    await helperprocessImage(req.file.destination, req.body.resolution);

    // en este constante aloja la ruta junto con el nombre especifico de la imagen que sera enviada como respuesta al cliente
    const optimizedImagePath = await `output/${req.file.filename}`;

    // Envía un mensaje de éxito al cliente junto con la ruta de la imagen optimizada
    res.json({
      message: `Archivo ${req.file.originalname} subido correctamente al servidor`,
      optimizedImagePath: optimizedImagePath,
    });



  } catch (error) {
    console.error("Error al procesar la imagen en routas:", error);
    res.status(500).send(`Ocurrió un error al procesar la imagen ${req.file.originalname}`);
  }
});



export { router };

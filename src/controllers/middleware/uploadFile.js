import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.IMAGE_UPLOAD_PATH || "src/input/");
  },
  filename: (req, file, cb) => {
    const extent = file.originalname.split(".").pop(); // image.png ---> png
    cb(null, `${Date.now()}.${extent}`);
  },
});
const upload = multer({ storage: storage });

export { upload };

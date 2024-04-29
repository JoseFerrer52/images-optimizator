import { helperprocessImage } from "./helpers/helperProcess.js";
import { response } from "../utilities/response.js";

const postIndexControllers = async (req, res) => {

  await helperprocessImage(req.file.destination, req.body.resolution);

  const optimizedImagePath = await `output/${req.file.filename}`;

  //console.log(optimizedImagePath);
  
  response(
    res,
    200,
    `Archivo ${req.file.originalname} subido correctamente al servidor`,
    optimizedImagePath,
  );
};

export { postIndexControllers };

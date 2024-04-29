import yup from "yup";
import { validationError } from "../../utilities/validationError.js";

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/gif",
];

const allowedResolutions = ["1920x1080", "1280x720", "720x480", "426x240"];

function validate(createFileValidation, createDataValidation) {
  return async (req, res, next) => {
    try {
      const validatedFile = await createFileValidation(req.file);
      const validatedData = await createDataValidation(req.body);

      req.file = validatedFile;
      req.body = validatedData;
      console.log(req.body);
      console.log(req.file);

      next();
    } catch (error) {
      next(new validationError(error));
    }
  };
}

async function createFileValidation(data) {
  const schema = yup.object().shape({
    mimetype: yup
      .string()
      .oneOf(allowedMimeTypes, "El tipo de archivo es invalido")
      .required("El tipo de archivo es requerido"),
    originalname: yup
      .string()
      .matches(
        /^.{0,255}$/,
        "El nombre original no debe exceder los 255 caracteres"
      )
      .required("El nombre es requerido"),
  });

  const validatedFile = await schema.validate(data);
  return validatedFile;
}

async function createDataValidation(data) {
  const schema = yup.object().shape({
    resolution: yup
      .string()
      .oneOf(allowedResolutions, "Resolución Invalida")
      .required("la resolución es requerida"),
  });
  const validatedData = await schema.validate(data);
  return validatedData;
}

export { validate, createFileValidation, createDataValidation };

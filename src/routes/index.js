import { Router } from "express";
import { upload } from "../controllers/middleware/uploadFile.js";
import {
  validate,
  createDataValidation,
  createFileValidation,
} from "../controllers/middleware/validations.js";
import { cachedAsync } from "../utilities/cachedAsync.js";
import { postIndexControllers } from "../controllers/postControllers.js";
import { getIndexControllers } from "../controllers/getControllers.js";

const router = Router();

router.get("/", cachedAsync(getIndexControllers));

router.post( "/", upload.single("file"),validate(createFileValidation, createDataValidation),
cachedAsync(postIndexControllers)
);

export { router };
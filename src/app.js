import express from "express";
import ejs from "ejs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/index.js";
import { pathError } from "./utilities/pathError.js";
import { resError } from "./utilities/resError.js";
import logger from "morgan"
import cors from "cors"
import helmet from "helmet";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000

app.set("views", join(__dirname, "views"))
app.set("view engine", ejs);

app.use(logger("dev"))
app.use(express.static(join(__dirname, "public/css")));
app.use(express.static(join(__dirname, "public/img")));
app.use(express.static(join(__dirname, "public/js")));
app.use("/output", express.static(join(__dirname, 'output')));
app.use(express.json())
app.use(helmet());
app.use(cors({}));

app.use(router);
app.use(pathError)
app.use((error, req, res, next)=>{
  const {status, message, path, name} = error
  resError(res, status, message, name, path)
})

app.listen(port, () => {
  //console.log(`server is listerning on port ${port}`)
})

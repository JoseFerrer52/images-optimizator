import express from "express";
import ejs from "ejs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/index.js";
import logger from "morgan"
import cors from "cors"
import helmet from "helmet"; //El paquete helmet para configurar automáticamente varias cabeceras de seguridad HTTP. Esto puede ayudar a proteger la aplicación contra una variedad de ataques comunes.

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"))
app.set("view engine", ejs);
app.set("/output", express.static(join(__dirname, 'output')));

app.listen(3000);
app.use(logger("dev"))
app.use(router);
app.use(express.static(join(__dirname, "public/css")));
app.use(express.static(join(__dirname, "public/img")));
app.use(express.static(join(__dirname, "public/js")));
app.use("/output", express.static(join(__dirname, 'output')));
app.use(express.json())
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000/'
  }));

app.use((req, res, next) => {
    res.status(404).render("error.ejs", {
      title: "Error 404 Not Found",
      message: "El recurso que estás buscando no existe.",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`error 500 Algo se rompio XD!`);
  });

console.log("server is listerning on port 3000");
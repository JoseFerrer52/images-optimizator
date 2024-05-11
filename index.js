import { app } from "./src/app.js";
import dontev from "dotenv"

dontev.config()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is listerning on port ${port}`)
  })
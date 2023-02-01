import express from "express";
import db from "./config/config.js"
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão \n "));
db.once("open", () =>
  console.log("Conexão com o banco realizada com sucesso \n")
);

const app = express();

routes(app)

export default app;

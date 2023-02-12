import express from "express";
import db from "./config/config.js"
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão \n "));
db.once("open", () =>
  console.log("Conexão com o banco realizada com sucesso \n")
);

const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
})

routes(app)

export default app;

import express from "express";
import recipesRouter from "./recipesRoutes.js";

export default function routes(app) {
  app.get("/", async (req, res) => {
    res.send("Api do restaurante")
  });

  app.use(express.json(), recipesRouter);
}

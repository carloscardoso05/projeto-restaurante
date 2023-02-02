import express from "express";
import TableController from "../controllers/tablesController.js";

const tablesRouter = express.Router();

tablesRouter
  .get("/tables", TableController.listTables)
  .get("/tables/:id", TableController.findTableById)
  // .get("/tables/:id/orders", TableController.listOrders)
  .post("/tables/", TableController.createTable);

export default tablesRouter;

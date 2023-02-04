import express from "express";
import TableController from "../controllers/tablesController.js";

const tablesRouter = express.Router();

tablesRouter
  .get("/tables", TableController.listTables)
  .get("/tables/:tableId", TableController.findTableById)
  .post("/tables/", TableController.createTable)
  .put("/tables/:tableId", TableController.updateTable)
  .delete("/tables/:tableId", TableController.deleteTable)

export default tablesRouter;

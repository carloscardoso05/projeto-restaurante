import express from "express";
import OrderController from "../controllers/OrdersController.js";

const ordersRouter = express.Router();

ordersRouter
  .get("/tables/:tableId/orders", OrderController.listOrders)
  .get("/tables/:tableId/orders/:orderId", OrderController.findOrderById)
  .post("/tables/:tableId/orders/", OrderController.createOrder)
  // .put("/tables/:tableId/orders/:orderId", OrderController.updateOrder)
  // .delete("/tables/:tableId/orders/:orderId", OrderController.deleteOrder)

export default ordersRouter;
import mongoose from "mongoose";
import { orderSchema } from "./Order.js";

export const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  orders: [orderSchema],
  empty: { type: Boolean },
  bill: { type: Number },
});

const tables = mongoose.model("tables", tableSchema);

export default tables;

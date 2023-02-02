import mongoose from "mongoose";
import { orderSchema } from "./Order";

export const tableSchema = new mongoose.Schema({
  orders: [orderSchema],
  empty: { type: Boolean, required: true },
  bill: { type: Number, required: true },
});

const tables = mongoose.model("tables", tableSchema);

export default tables;

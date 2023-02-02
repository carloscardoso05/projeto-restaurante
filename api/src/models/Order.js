import mongoose from "mongoose";
import { recipeSchema } from "./Recipe.js";

export const orderSchema = new mongoose.Schema({
    recipe: {type: recipeSchema, required: true},
    note: {type: String}
})
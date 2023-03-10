import mongoose from "mongoose";

export const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String] },
  price: { type: Number, required: true },
});

const recipes = mongoose.model("recipes", recipeSchema);

export default recipes;

import express from "express";
import RecipeController from "../controllers/recipesController.js";
import json_data from "../data/recipes.json" assert { type: "json" };
const recipes = JSON.parse(json_data)

const recipesRouter = express.Router();

recipesRouter
    .get("/recipes", RecipeController.listRecipes)
    .post("/recipes", RecipeController.createRecipe)

export default recipesRouter
import express from "express";
import RecipeController from "../controllers/recipesController.js";

const recipesRouter = express.Router();

recipesRouter
    .get("/recipes", RecipeController.listRecipes)
    .get("/recipes/:id", RecipeController.findRecipeById)
    .post("/recipes", RecipeController.createRecipe)
    .put("/recipes/:id", RecipeController.updateRecipe)
    .delete("/recipes/:id", RecipeController.deleteRecipe)

export default recipesRouter
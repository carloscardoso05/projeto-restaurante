import mongoose from "mongoose";
import recipes from "../models/Recipe.js";

class RecipeController {
  static listRecipes(req, res) {
    recipes.find((error, recipes) => {
      res.status(200).json(recipes);
    });
  }

  static createRecipe(req, res) {
    const recipe = new recipes(req.body);
    recipe.save((error) => {
      if (!error) {
        res.status(201).send(`Receita adicionada com sucesso \n ${req.body}`)
        return
      }
      res.status(500).send(`${error.message} - falha ao adicionar a receita`)
    });
  }
}

export default RecipeController;

import recipes from "../models/Recipe.js";

class RecipeController {
  static listRecipes(req, res) {
    recipes.find((error, recipes) => {
      res.status(200).json(recipes);
    });
  }
}

export default RecipeController;

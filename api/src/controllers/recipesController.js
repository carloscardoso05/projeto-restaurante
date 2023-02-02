import mongoose from "mongoose";
import recipes from "../models/Recipe.js";
import json_data from "../data/recipes.json" assert { type: "json" };
const recipes_data = JSON.parse(json_data);

class RecipeController {
  //GET
  static listRecipes(req, res) {
    recipes.find((error, recipes) => {
      if (!error) {
        res.status(200).json(recipes);
        return;
      }
      res.status(500).send(`${error.message} - falha ao listar as receitas`);
    });
  }

  static findRecipeById(req, res) {
    const { id } = req.params;
    recipes.findById(id, (error, recipe) => {
      if (!error) {
        res.status(200).json(recipe);
        return;
      }
      res.status(500).send(`${error.message} - falha ao listar a receita`);
    });
  }

  //POST
  static createRecipe(req, res) {
    const recipe = new recipes(req.body);
    recipe.save((error) => {
      if (!error) {
        res.status(201).send(`Receita adicionada com sucesso \n ${req.body}`);
        return;
      }
      res.status(500).send(`${error.message} - falha ao adicionar a receita`);
    });
  }

  //PUT
  static updateRecipe(req, res) {
    const { id } = req.params;
    recipes.findByIdAndUpdate(id, { $set: req.body }, (error) => {
      if (!error) {
        res.status(201).send(`Receita atualizada com sucesso \n ${req.body}`);
        return;
      }
      res.status(500).send(`${error.message} - falha ao atualizar a receita`);
    });
  }

  //DELETE
  static deleteRecipe(req, res) {
    const {id} = req.params
    recipes.findByIdAndDelete(id, error => {
      if(!error){
        res.status(201).send(`Receita apagada com sucesso \n ${req.body}`)
        return
      }
      res.status(500).send(`${error.message} - falha ao apagar a receita`);
    })
  }
}

export default RecipeController;

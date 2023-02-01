import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},
    ingredients: {type: [String]}
})

const recipes = mongoose.model("recipes", recipeSchema)

export default recipes
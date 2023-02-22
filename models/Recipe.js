const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'A recipe needs a catchy title!'
    },
    image: String,
    imageUrl: String,
    description: {
        type: String,
        required: 'You need a description for this recipe!'
    },
    ingredients: [
        {
            item: String,
            amount: Number,
            unit: String
        }
    ],
    steps: [String],
    tags: [String]
})


module.exports = mongoose.model('Recipe', recipeSchema)
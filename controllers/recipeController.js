require('dotenv').config()
const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')
const { s3 } = require('../lib/aws')




exports.createRecipe = async (req, res, next) => {
    try {
        const recipe = await (new Recipe(req.body)).save()
        res.json(`${recipe.title} added to DB`)
    } catch (err) { 
        next(err)

    }
}

exports.getRecipes = async (req, res, next) => {
    try {
        // FIRST GET THE RECIPES FROM MONGODB
        const recipes = await Recipe.find()

        // THEN APPEND THE IMAGE URL TO THEM
        for (let recipe of recipes) {
            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: `recipeImages/${recipe.image}`,
                    }
            // GET SIGNED URL FROM S3
            recipe.imageUrl = await s3.getSignedUrl('getObject', params)   
        
        }

        res.json(recipes)
    } catch(err) {
       next(err)
    }
}

exports.getOneRecipe = async(req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        req.recipe = recipe
        next()
        // res.json(recipe)
    } catch (err) {
        next(err)

    }
}

exports.updateRecipe = async(req, res, next) => {
    try {

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { returnDocument: 'after', useFindAndModify: false }
        )
        res.json(`${recipe.title} successfully updated!`)

    } catch (err) {
        next(err)

    }
}

exports.deleteOne = async(req, res, next) => {
    try {   
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id })

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `recipeImages/${recipe.image}`,
        }

        await s3.deleteObject(params).promise()
        
        res.json(`${recipe.title} deleted.`)

    } catch (err) {
        next(err)

    }
}
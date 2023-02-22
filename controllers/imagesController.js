require('dotenv').config()
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const { s3 }  = require('../lib/aws')



exports.imageToS3 = async(req, res, next) => {
    try {
      req.body.image = req.body.image || uuidv4()
      const { file } = req
      if (!file) return next()


      const imgBuffer = await sharp(file.buffer)
      .resize({ height: 1000, width: 1000, fit: "contain" })
      .toBuffer()

      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `recipeImages/${req.body.image}`,
        Body: imgBuffer
      }

      await s3.upload(params).promise()
      
      next()
    } catch (err) {
        next(err)
      return
    }
}


exports.getOneImage = async(req, res, next) => {
    try {
        const { recipe } = req
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `recipeImages/${recipe.image}`
          }

          const result = await s3.getObject(params).promise()
          recipe.image = result
          res.json(recipe)
    } catch (err) {
        next(err)

    } 
}

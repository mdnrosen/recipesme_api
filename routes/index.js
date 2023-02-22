const express = require('express')
const router = express.Router()
const multer = require('multer')

const rc = require('../controllers/recipeController')
const ic = require('../controllers/imagesController')





const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/recipes',
    rc.getRecipes
)

router.post('/recipe',
    upload.single('image'),
    ic.imageToS3,
    rc.createRecipe
)

router.put('/recipes/:id',
    rc.updateRecipe
)

router.get('/recipes/:id', 
    rc.getOneRecipe,
    ic.getOneImage
)


router.delete('/recipes/:id',
    rc.deleteOne
)




module.exports = router
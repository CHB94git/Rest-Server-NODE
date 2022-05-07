const { Router } = require('express')
const { param } = require('express-validator')

const { updateImage, loadFile, showImage, updateImageCloudinary } = require('../controllers')

const { allowedCollections } = require('../helpers')

const { validateFields, validateUploadFile } = require('../middlewares')

const router = Router()


router.post('/', validateUploadFile, loadFile)

router.route('/:collection/:id')
    .get([
        param('id', 'El ID debe ser un MongoID válido').isMongoId(),
        param('collection').custom(c => allowedCollections(c, ['usuarios', 'productos'])),
        validateFields
    ], showImage)

    .put([
        validateUploadFile,
        param('id', 'El ID debe ser un MongoID válido').isMongoId(),
        param('collection').custom(c => allowedCollections(c, ['usuarios', 'productos'])),
        validateFields
    ], updateImageCloudinary) /* updateImage) */



module.exports = router
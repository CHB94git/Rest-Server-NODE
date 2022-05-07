const { Router } = require('express')
const { body, param } = require('express-validator')

const {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} = require('../controllers')

const { existCategorieByID, existProductByID } = require('../helpers')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')


const router = Router()

// Obtener todas los Productos -Crear un Producto
router.route('/')
    .get(getProducts)
    .post([validateJWT,
        body('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        body('category', 'No es un ID de Mongo válido').isMongoId(),
        body('category').custom(existCategorieByID),
        validateFields
    ], createProduct)


// Obtener un Producto
router.get('/:id', [
    param('id', 'No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existProductByID),
    validateFields
], getProduct)


// Actualizar un Producto
router.put('/:id', [
    validateJWT,
    param('id', 'No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existProductByID),
    body('category', 'No es un ID de Mongo válido').optional().isMongoId(),
    body('category').optional().custom(existCategorieByID),
    validateFields
], updateProduct)


// Eliminar un Producto
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    param('id', 'No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existProductByID),
    validateFields
], deleteProduct)


module.exports = router
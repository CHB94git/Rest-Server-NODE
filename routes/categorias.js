const { Router } = require('express')
const { body, param } = require('express-validator')

const {
    categoriasGetAll,
    categoriaGetOne,
    categoriasDelete,
    categoriasPost,
    categoriasPut
} = require('../controllers')

const { existCategorieByID } = require('../helpers')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')


const router = Router()

// Obtener todas las categorías -Crear una categoría
router.route('/')
    .get(categoriasGetAll)
    .post([validateJWT,
        body('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
        validateFields
    ], categoriasPost)

// Obtener una categoría
router.get('/:id', [
    param('id', 'No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existCategorieByID),
    validateFields
], categoriaGetOne)

// Actualizar una categoría
router.put('/:id', [
    validateJWT,
    param('id').custom(existCategorieByID),
    body('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    validateFields
], categoriasPut)

// Eliminar una categoría
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    param('id', 'No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existCategorieByID),
    validateFields
], categoriasDelete)


module.exports = router
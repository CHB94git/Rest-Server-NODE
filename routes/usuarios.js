const { Router } = require('express')
const { check, body, param } = require('express-validator')

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios')


const {
    isValidRole,
    emailExists,
    existUserByID
} = require('../helpers/db-validators')

const {
    validateFields,
    validateJWT,
    isAdminRole,
    haveRole
} = require('../middlewares')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
    body('name', 'El nombre es requerido').not().isEmpty(),
    body('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
    body('email', 'El email no es válido').isEmail(),
    body('email').custom(emailExists),
    body('role').custom(isValidRole),
    validateFields
], usuariosPost)

router.put('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existUserByID),
    body('role').custom(isValidRole),
    validateFields
], usuariosPut)

router.patch('/:id', [
    validateJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existUserByID),
    validateFields
], usuariosPatch)

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existUserByID),
    validateFields
], usuariosDelete)



module.exports = router

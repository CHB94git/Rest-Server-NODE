const { Router } = require('express')
const { check, checkSchema } = require('express-validator')

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios')


const { isValidRole, emailExists, existUserByID } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validateFields
], usuariosPut)

router.patch('/:id', usuariosPatch)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validateFields
], usuariosDelete)



module.exports = router

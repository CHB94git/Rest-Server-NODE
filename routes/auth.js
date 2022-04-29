const { Router } = require('express')
const { check, body } = require('express-validator')

const { login } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login', [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)

module.exports = router
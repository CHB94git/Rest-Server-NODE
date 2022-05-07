const { Router } = require('express')
const { body } = require('express-validator')

const { validateFields } = require('../middlewares')

const { login, googleSignIn } = require('../controllers')

const router = Router()

router.post('/login', [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)

router.post('/google', [
    body('id_token', 'ID Token de autenticación de Google es necesario').not().isEmpty(),
    validateFields
], googleSignIn)

module.exports = router
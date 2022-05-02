const { Router } = require('express')
const { check, body } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth')

const { validateFields } = require('../middlewares')



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
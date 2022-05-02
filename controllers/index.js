const authController = require('../controllers/auth')
const categoriasController = require('../controllers/categorias')
const usuariosController = require('../controllers/usuarios')
const productosController = require('../controllers/productos')

module.exports = {
    ...authController,
    ...categoriasController,
    ...usuariosController,
    ...productosController
}
const authController = require('./auth')
const categoriasController = require('./categorias')
const usuariosController = require('./usuarios')
const productosController = require('./productos')
const busquedasController = require('./busqueda')
const uploadsController = require('./uploads')


module.exports = {
    ...authController,
    ...categoriasController,
    ...usuariosController,
    ...productosController,
    ...busquedasController,
    ...uploadsController
}
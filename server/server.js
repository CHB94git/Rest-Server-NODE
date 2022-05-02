const express = require('express')
const cors = require('cors')
const { connectionDB } = require('../database/config')

const {
    authRoutes,
    categoriaRoutes,
    usuariosRoutes,
    productosRoutes
} = require('../routes')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        // Conectar a la BD
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas de la App
        this.routes()
    }

    async connectDB () {
        await connectionDB()
    }

    middlewares () {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes () {
        this.app.use(this.paths.auth, authRoutes)
        this.app.use(this.paths.categorias, categoriaRoutes,)
        this.app.use(this.paths.productos, productosRoutes)
        this.app.use(this.paths.usuarios, usuariosRoutes)
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`)
        })
    }
}


module.exports = Server

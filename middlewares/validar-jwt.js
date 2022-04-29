const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - User don´t exist'
            })
        }

        // Verificar si el usuario tiene estado true
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no válido - User state: false'
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    validateJWT
}
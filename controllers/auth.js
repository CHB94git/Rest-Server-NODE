const { response } = require("express")
const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario')
const { generarJWT } = require("../helpers/generarJWT")

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {
        // Verificar sí el email existe
        const usuario = await Usuario.findOne({
            email
        })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario no activo - State: false'
            })
        }

        // Sí el usuario está activo
        const passValidate = bcrypt.compareSync(password, usuario.password)

        // Verificar la contraseña
        if (!passValidate) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Algo salió mal"
        })
    }
}



module.exports = {
    login
}
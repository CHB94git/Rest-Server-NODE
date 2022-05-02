const bcrypt = require('bcrypt')
const { response, request } = require('express')

const { Usuario } = require('../models')

const usuariosGet = async (req = request, res = response) => {

    const { limite = 20, from = 0 } = req.query

    if (isNaN(limite) || isNaN(from)) {
        return res.status(400).json({
            msg: 'El(los) valor(es) específicados no son un número!'
        })
    }

    /* 
    // No es BUENA PRACTICA ENCADENAR PROMESAS CON AWAIT
    // Solo se hace sí una depende estrictamente de la otra
    const usuarios = await Usuario.find({ state: true })
        .skip(Number(from))
        .limit(Number(limite))

    const total = await Usuario.countDocuments({ state: true }) */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ state: true }),
        Usuario.find({ state: true })
            .skip(Number(from))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body
    const usuario = new Usuario({ name, email, password, role })

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10)
    usuario.password = bcrypt.hashSync(password, salt)

    // Guardar en BD
    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...resto } = req.body

    if (password) {
        const salt = bcrypt.genSaltSync(10)
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })

    res.json(usuario)
}

const usuariosPatch = async (req = request, res = response) => {

    const { id } = req.params

    const userEnable = await Usuario.findByIdAndUpdate(id, { state: true }, { new: true })

    res.json({
        msg: 'El usuario ha sido habilitado correctamente!',
        userEnable
    })
}

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params

    // Borrar físicamente de la base de Datos - NO RECOMENDADO
    // const usuarioEliminado = await Usuario.findByIdAndDelete(id)

    const userDisabled = await Usuario.findByIdAndUpdate(id, { state: false }, { new: true })

    // const userAuthenticated = req.usuario

    res.json({
        // msg: 'El usuario ha sido eliminado correctamente de la BD',
        // usuarioEliminado,
        msg: 'El usuario ha sido deshabilitado correctamente!',
        userDisabled,
        // userAuthenticated
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}

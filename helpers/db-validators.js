const Role = require('../models/role')
const Usuario = require('../models/usuario')

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

const emailExists = async (email = '') => {
    // Verificar si el correo existe
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
        throw new Error(`El email: ${email}, ya está registrado`);
    }
}

const existUserByID = async (id) => {
    // Verificar si el usuario existe
    const existUser = await Usuario.findById(id);
    if (!existUser) {
        throw new Error(`El usuario con id: ${id}, no existe`);
    }
}


module.exports = {
    isValidRole,
    emailExists,
    existUserByID
}
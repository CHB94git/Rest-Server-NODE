const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    let uid = _id
    let usuarioOrdenado = Object.assign({ uid }, usuario)
    return usuarioOrdenado
}


module.exports = model('Usuario', UsuarioSchema)

/* const Paciente = mongoose.model('Paciente', pacienteSchema)

const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario

export default Paciente */
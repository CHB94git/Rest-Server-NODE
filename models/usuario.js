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
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}


module.exports = model('Usuario', UsuarioSchema)

/* const Paciente = mongoose.model('Paciente', pacienteSchema)

export default Paciente */
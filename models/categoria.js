const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    const { __v, state, _id, ...categoria } = this.toObject()
    let id_cat = _id
    let categoriaOrdenada = Object.assign({ id_cat }, categoria)
    return categoriaOrdenada
}


module.exports = model('Categoria', CategoriaSchema)
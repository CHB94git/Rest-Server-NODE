const validateFields = require('./validar-campos')
const validateJWT = require('./validar-jwt')
const rolesValidate = require('./validar-roles')
const validateFile = require('./validar-archivo')


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...rolesValidate,
    ...validateFile
}
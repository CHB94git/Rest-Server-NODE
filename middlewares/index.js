const validateFields = require('../middlewares/validar-campos')
const validateJWT = require('../middlewares/validar-jwt')
const rolesValidate = require('../middlewares/validar-roles')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...rolesValidate
}
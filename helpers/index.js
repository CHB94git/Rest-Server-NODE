const dbValidators = require('./db-validators')
const generateJWT = require('./generarJWT')
const googleVerify = require('./google-verify')
const fileUploads = require('./upload-file')
const validateCollections = require('./validate-collections')


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...fileUploads,
    ...validateCollections
}

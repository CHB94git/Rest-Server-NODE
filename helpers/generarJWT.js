const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('No se pudo generar el Token')
            } else {
                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJWT
}
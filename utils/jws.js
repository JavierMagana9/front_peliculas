const jws = require('jsonwebtoken')
//nos permite poder generar el token atraves de un JWS
const JWTGenerator = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };//el cuerpo de lo que nostros queremos encriptar para volverlo un token

        //hacer el Token

        jws.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: '4h'},
            (error, token) => {
                if (error) {
                    reject('error al generar el token')
                }
                resolve(token)
            }
        )
    })
}

module.exports={
    JWTGenerator
}
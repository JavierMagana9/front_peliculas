const jws = require('jsonwebtoken')

//creamos la funcion validar el JWT  en la cual nosotros recogeremos del header el token el cual validaremos y recogeremos el ID y una vez comprobado y validado pasaremos a generar en nuestra ruta el Renew token donde generamos un nuevo token
const jwtValidar = (req, res, next) => {


    const token = req.header('x-Token');
    //console.log(token)

    if (!token) {
        return res.status(401).json({
            error: true,
            msg: 'No existe el token en la peticion'
        })
    }

    try {
        const payload = jws.verify(token, process.env.SECRET_KEY);
        req.uid = payload.uid


    } catch (error) {
        return res.status(401).json({
            error: true,
            msg: 'el token no es valido'
        })
    }

    next()
}

module.exports = {
    jwtValidar
}
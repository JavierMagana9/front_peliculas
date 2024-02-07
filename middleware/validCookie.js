

const validacionCookie = (req, res, next) => {
if(req.cookies.xtoken!=undefined){

    let cookie = JSON.parse(req.cookies.xtoken)

    console.log("cookie parseada en middleware", cookie)

const {uid,rol}=cookie

console.log(uid)
console.log(rol)

    // const { rol } = cookie

    // console.log("ROL =====", rol)
    if (rol == 'u') {
        console.log("entro por el usuario")
        next()
    } else if (rol == "a") {
        console.log("entro por el admin")
        next()
    } else {
        res.redirect("/")
        console.log("No tiene autorizacion para ingresar")
    }

}else{
    res.redirect("/")
    console.log("No tiene autorizacion para ingresar")
}

   
}




module.exports = { validacionCookie }




// if(req.cookies.xToken==undefined){
//     res.redirect("/")
//     console.log("LA COOKIE NO ESTA DEFINIDA");
// }else {

// const cookie=req.cookies.xToken;

// console.log("COOCKIE EN USER",cookie);
// }
//const rol= cookie.substr(cookie.length-1,cookie.length);
//console.log("rol recuperado de la cookie",rol)
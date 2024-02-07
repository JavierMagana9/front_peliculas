const express = require('express')
const router = express.Router()

const {registrarUsuario, getLogin,getRegistro, loguearUsuario,logoutUsuario,authGoogle,getRecuperarPass,postRecuperarPass}=require('../controllers/authControllers')




//Vista del login 
router.get("/",getLogin)
//envia email y password para comprobar 
router.post("/", loguearUsuario)

//Logout
router.post("/logout",logoutUsuario)


//Autenticacion por Google
router.post("/authGoogle",authGoogle)

//Muestra el panel de registro
router.get("/registro",getRegistro)

//registrar usuario atravez de firebase
router.post("/registro", registrarUsuario)

//Recuperar Contraseña
router.get("/recuperarPass",getRecuperarPass)
router.post("/recuperarPass",postRecuperarPass)


module.exports=router

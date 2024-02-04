const express = require('express')
const router = express.Router()

const {registrarUsuario, getLogin,getRegistro, loguearUsuario}=require('../controllers/authControllers')

//Vista del login 
router.get("/",getLogin)
//envia email y password para comprobar 
router.post("/", loguearUsuario)


//Muestra el panel de registro
router.get("/registro",getRegistro)

//registrar usuario atravez de firebase
router.post("/registro", registrarUsuario)


module.exports=router

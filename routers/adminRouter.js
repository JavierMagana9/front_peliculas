const express = require('express')
const router = express.Router()

const {getPelis,getCrearPelis,postCrearPelis, getModificarPeli,vistaEliminar, modificarPeli} = require('../controllers/adminControllers')

//dashboard getPelis  "/",

router.get('/', getPelis)

//crear "/crear"

router.get('/crear', getCrearPelis)
router.post('/crear', postCrearPelis)

//editar "/editar/:id"

 router.get('/modificar/:id', getModificarPeli)
// router.post('/modificar')
router.post('/modificar', modificarPeli)
// vistaEliminar
router.get('/eliminar/:id',vistaEliminar)
//eliminar "/eliminar/:id" 

module.exports = router

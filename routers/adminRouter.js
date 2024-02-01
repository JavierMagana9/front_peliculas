const express = require('express')
const router = express.Router()

const {getPelis,getCrearPelis,postCrearPelis} = require('../controllers/adminControllers')

//dashboard getPelis  "/",

router.get('/', getPelis)

//crear "/crear"

router.get('/crearpeli', getCrearPelis)
router.post('/crearpeli', postCrearPelis)

//editar "/editar/:id"

// router.get('/modificar')
// router.post('/modificar')

//eliminar "/eliminar/:id" 

module.exports = router

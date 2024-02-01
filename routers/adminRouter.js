const express = require('express')
const router = express.Router()

const {getPelis, crearPelis} = require('../controllers/adminControllers')
//dashboard getPelis  "/",

router.get('/', getPelis)
//crear "/crear"

router.get('/', crearPelis)


//eliminar "/eliminar/:id" 


//editar "/editar/:id"

module.exports = router

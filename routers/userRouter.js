const express = require('express')
const router = express.Router()

const {getIndexUser,getPeliculas,getFavoritos,postPeliTitulo,verMasId} = require('../controllers/userControllers')

//dashboard User
router.get('/', getIndexUser)
//en esta vista habran 2 botones los cuales tendran buscar peliculas y ver mi peliculas favoritas 

//muestra todas las peliculas y tendra un boton de añadir a favoritos
router.get('/search', getPeliculas)

router.get('/search/:id', verMasId)

// //buscar peliculas por titulo"

router.post('/search', postPeliTitulo)

// //dentro de buscar peliculas (ya se visualizaran todas las peliculas)habra un input text con la opcion de poder buscar la pelicula por titulo, y cuando de click en buscar peliculas te muestre dicha pelicula cada pelicula tendra un boton de ver mas y otro de añadir favoritos 

// //ver mis favoritos en este boton se veran las peliculas añadidas a favoritos y tambien podra quitar las peliculas de favoritos, 
router.get('/movies', getFavoritos)


// //menu hamburguesa va a tener // inicio // buscador // mis peliculas 
// router.get('/', getIndex)
// router.get('/favoritos', getFavoritos)
// router.get ('/logout', logout)


module.exports=router


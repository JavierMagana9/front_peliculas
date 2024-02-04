const express = require('express')
const router = express.Router()

const {getIndexUser,getPeliculas,getFavoritos,postPeliTitulo,verMasId} = require('../controllers/userControllers')

/**
 * Ruta GET para la página principal del área de usuario.
 * Muestra opciones como buscar películas y ver películas favoritas.
 * 
 * @name getIndexUser
 * @path {GET} /
 */
router.get('/', getIndexUser)
//en esta vista habran 2 botones los cuales tendran buscar peliculas y ver mi peliculas favoritas 

/**
 * Ruta GET para buscar y mostrar todas las películas.
 * Incluye un botón para añadir películas a favoritos.
 * 
 * @name getPeliculas
 * @path {GET} /search
 */
router.get('/search', getPeliculas)
/**
 * Ruta GET para ver más detalles de una película específica.
 * El ID de la película se pasa como parámetro en la ruta.
 * 
 * @name verMasId
 * @path {GET} /search/:id
 */
router.get('/search/:id', verMasId)

/**
 * Ruta POST para buscar películas por título.
 * Recibe el título de la película en el cuerpo de la solicitud.
 * 
 * @name postPeliTitulo
 * @path {POST} /search
 */
router.post('/search', postPeliTitulo)

// //dentro de buscar peliculas (ya se visualizaran todas las peliculas)habra un input text con la opcion de poder buscar la pelicula por titulo, y cuando de click en buscar peliculas te muestre dicha pelicula cada pelicula tendra un boton de ver mas y otro de añadir favoritos 

// //ver mis favoritos en este boton se veran las peliculas añadidas a favoritos y tambien podra quitar las peliculas de favoritos, 
/**
 * Ruta GET para ver las películas favoritas del usuario.
 * Muestra las películas que el usuario ha añadido a su lista de favoritos.
 * 
 * @name getFavoritos
 * @path {GET} /movies
 */
router.get('/movies', getFavoritos)


// //menu hamburguesa va a tener // inicio // buscador // mis peliculas 
// router.get('/', getIndex)
// router.get('/favoritos', getFavoritos)
// router.get ('/logout', logout)


module.exports=router


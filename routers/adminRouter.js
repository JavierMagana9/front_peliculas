const express = require('express')
const router = express.Router()

const {getPelis,getCrearPelis,postCrearPelis, getModificarPeli,vistaEliminar, modificarPeli, eliminarDefinitivo} = require('../controllers/adminControllers')

/**
 * Ruta GET para obtener la página principal que muestra una lista de películas.
 * Utiliza el controlador 'getPelis' para recuperar las películas y renderizar la vista correspondiente.
 * 
 * @name getPelis
 * @path {GET} /
 */
router.get('/', getPelis)

/**
 * Ruta GET para mostrar el formulario de creación de películas.
 * Utiliza el controlador 'getCrearPelis' para renderizar la vista del formulario.
 * 
 * @name getCrearPelis
 * @path {GET} /crear
 */
router.get('/crear', getCrearPelis)
/**
 * Ruta POST para procesar el formulario de creación de películas.
 * Utiliza el controlador 'postCrearPelis' para manejar la entrada del formulario
 * y crear una nueva película.
 * 
 * @name postCrearPelis
 * @path {POST} /crear
 */
router.post('/crear', postCrearPelis)

/**
 * Ruta GET para mostrar el formulario de modificación de una película específica.
 * Utiliza el controlador 'getModificarPeli' para obtener los detalles de la película
 * basándose en el ID proporcionado en la ruta y luego renderiza la vista de modificación.
 * 
 * @name getModificarPeli
 * @path {GET} /modificar/:id
 */
router.get('/modificar/:id', getModificarPeli)
/**
 * Ruta POST para procesar la modificación de una película.
 * Utiliza el controlador 'modificarPeli' para manejar los datos del formulario
 * y actualizar la película correspondiente.
 * 
 * @name modificarPeli
 * @path {POST} /modificar
 */
router.post('/modificar', modificarPeli)
/**
 * Ruta GET para mostrar la vista de confirmación de eliminación de una película.
 * Utiliza el controlador 'vistaEliminar' para renderizar la vista de confirmación
 * basándose en el ID de la película proporcionado en la ruta.
 * 
 * @name vistaEliminar
 * @path {GET} /eliminar/:id
 */
router.get('/eliminar/:id',vistaEliminar)
/**
 * Ruta POST para eliminar definitivamente una película.
 * Utiliza el controlador 'eliminarDefinitivo' para eliminar la película
 * basándose en el ID proporcionado en la ruta.
 * 
 * @name eliminarDefinitivo
 * @path {POST} /eliminardef/:id
 */
router.post('/eliminar/:id', eliminarDefinitivo)

module.exports = router

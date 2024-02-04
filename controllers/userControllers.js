const { consulta } = require("../utils/consulta");

/**
 * Controlador de ruta para renderizar la vista principal del usuario.
 * Muestra la página de inicio para el área de usuario.
 *
 * @function getIndexUser
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {void} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */

const getIndexUser = async (req, res) => {
    res.render("user/indexUser")
}

/**
 * Controlador de ruta asincrono para obtener una lista de películas.
 * Realiza una solicitud a nuestra API y luego renderiza la vista 'buscarPeli'
 * en el área de usuario con los resultados obtenidos.
 *
 * @async
 * @function getPeliculas
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */
const getPeliculas = async (req, res) => {

    let respuesta = await consulta(`${process.env.URL_BASE}/search`);
    console.log("dentro de user", respuesta.error)
    res.render("user/buscarPeli", {
        respuesta
    })

}

/**
 * Controlador de ruta asincrono para obtener detalles de una película especifica.
 * Utiliza el ID de la película proporcionado en los parámetros de la ruta para hacer una solicitud
 * a nuestra API y obtener la información detallada de la película. Luego, renderiza la vista 'verMasId'
 * en el área de usuario con los detalles obtenidos.
 *
 * @async
 * @function verMasId
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP,
 * como el ID de la película en req.params.id.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */

const verMasId = async (req,res)=>{

    console.log("probando el param",req.params.id)

    const id = req.params.id
    let url= `${process.env.URL_BASE}/search/peli/${id}`;
    const respuesta=await consulta(url)
    console.log("dentro de id",respuesta)
    res.render("user/verMasId", respuesta)
}


/**
 * Controlador de ruta POST para buscar películas por título.
 * Extrae el título de la película del cuerpo de la solicitud, realiza una solicitud GET a nuestra API para
 * buscar películas por ese título, y luego renderiza la vista 'verMasTitulo' con los resultados obtenidos.
 *
 * @async
 * @function postPeliTitulo
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP,
 * incluyendo el título de la película en req.body.titulo.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */
const postPeliTitulo = async(req,res) =>{

 const titulo=req.body.titulo

 console.log("el titulo",titulo)

 const url = `${process.env.URL_BASE}/search/${titulo}`;

 const respuesta = await consulta(url, "GET", titulo);
  console.log("respuestaaa de titulo",respuesta)
//   console.log("respuestaaa erroorr",respuesta.error)
//   console.log("respuestaaa arrayy",respuesta.respuesta)

if(respuesta.error){
    console.log("entra por el if")
res.send("pelicula no encotrada")
}else{
console.log("entra por el else")
res.render("user/verMasTitulo", respuesta)
}
 


}


/**
 * Controlador de ruta para renderizar la página de favoritos del usuario.
 * Muestra la vista 'favoritos' dentro del área de usuario.
 *
 * @function getFavoritos
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {void} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */

const getFavoritos = (req, res) => {
    res.render("user/favoritos")
}
module.exports = {
    getIndexUser,
    getPeliculas,
    getFavoritos,
    postPeliTitulo,
    verMasId
}
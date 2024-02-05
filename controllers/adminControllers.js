//traer el modelo
const { consulta } = require("../utils/consulta");
//const {} = require('../public/uploads')
/**
 * Controlador de ruta asíncrono que obtiene una lista de películas desde la API
 * y renderiza la vista del panel de administración con dicha lista.
 *
 * @async
 * @function getPelis
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */
const getPelis = async (req, res) => {
  let respuesta = await consulta(`${process.env.URL_BASE}/search`);
  //let respuesta = await fetch(`${process.env.URL_BASE}/search`);
  //console.log(respuesta);

  res.render("admin/cPanel", {
    respuesta,
    //imagePath: process.env.URL_BASE
  });
};

/**
 * Manejador de ruta GET para mostrar el formulario de creación de películas.
 * Renderiza la plantilla de formulario de creación.
 *
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 */

const getCrearPelis = (req, res) => {
  res.render("admin/formCrear", {
    respuesta: null,
  });
};


/**
 * Manejador de ruta POST que procesa la creación de una nueva película.
 * Recoge los datos del formulario enviados en el cuerpo de la solicitud (req.body),
 * hace una llamada POST a la URL especificada para crear la película y luego
 * renderiza la vista del formulario de creación con la respuesta recibida.
 *
 * @async
 * @function postCrearPelis
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP,
 * incluyendo los datos del formulario en req.body.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */

const postCrearPelis = async (req, res) => {
  const url = `${process.env.URL_BASE}/createMovie`;
  const body = req.body;
  
  //const file =req.file;
  console.log("body crearPelis", body);
  //console.log("file crearPelis", file);
  // if (req.file) {
  //   body.image = req.file.path; // Añade la ruta de la imagen al cuerpo de la solicitud
  // }
const imagen = req.body.imagen
const file = req.body.file
console.log("req.body.imagen",imagen)
console.log("req.body.file",file)
  const respuesta = await consulta(url, "POST", body);
  console.log("respuesta postCrear", respuesta);
  
  res.render("admin/formCrear", {
    respuesta,
  });

  // res.redirect('/admin/crear')
};

/**
 * Manejador de ruta GET para obtener los detalles de una película específica para su modificación.
 * Usa el ID de la película proporcionado en los parámetros de la ruta para hacer una solicitud
 * a una URL externa y obtener la información de la película. Luego, renderiza la vista del formulario 
 * de modificación con los detalles de la película.
 *
 * @async
 * @function getModificarPeli
 * @param {Request} req - El objeto de solicitud de Express, que contiene información sobre la petición HTTP,
 * incluyendo el ID de la película en req.params.id.
 * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns {Promise<void>} - No devuelve nada ya que la respuesta se maneja mediante el método `render`.
 */

//GET MODIFICAR PELI
const getModificarPeli = async (req, res) => {
  const id = req.params.id;
  let url = `${process.env.URL_BASE}/search/peli/${id}`;
  const respuesta = await consulta(url);
  console.log("get modificar", respuesta);

  res.render("admin/formModificar", {
    error: respuesta.error,
    ...respuesta.respuesta[0],
    id: null,
  });
};


//POST MODIFICAR PELI

const modificarPeli = async (req, res) => {
  const body = req.body;
  const idParam = req.params.id;
  const id = body.id;
  console.log("ID", id);
  const url = `${process.env.URL_BASE}/editMovie/${id}`;

  const respuesta = await consulta(url, "PUT", body);
  console.log("modificar", respuesta);
  console.log("ID param despues de respuesta", idParam);
  console.log("ID despues de respuesta", id);
  if (respuesta.error) {
    // return res.render('admin/formModificar',{
    //   error:respuesta.error,
    // ...respuesta.respuesta[0]
    // })
    // console.log("respuesta modificarPelis",respuesta)
    //  return res.render('/admin/formModificar', {
    //   respuesta,
    //   id
    // })
  }
  res.redirect("/admin");
};

//GET ELIMINAR
const vistaEliminar = (req, res) => {
  res.render("admin/eliminar", {
    id: null,
  });
};

//POST ELIMINAR
const eliminarDefinitivo = async (req, res) => {
  const body = req.body;
  const id = body.id;
  console.log("bodyid en eliminar", id);
  // const url = `${process.env.URL_BASE}/removeMovie/${id}`;

  // const respuesta = await consulta(url, "DELETE", body);
};

module.exports = {
  getPelis,
  getCrearPelis,
  postCrearPelis,
  getModificarPeli,
  vistaEliminar,
  modificarPeli,
  eliminarDefinitivo,
};

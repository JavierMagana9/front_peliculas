/**
 * Funcion para utilizar fetch de una manera mas limpia en los controladores.
 * Realiza una solicitud HTTP a la URL proporcionada utilizando el método especificado.
 * Si el método es POST o PUT, incluirá el cuerpo de la solicitud en formato JSON.
 * En caso de error en la solicitud, atrapará el error y lo devolverá.
 * 
 * @async
 * @function consulta
 * @param {string} url - La URL a la que se enviará la solicitud.
 * @param {string} [method='GET'] - El método HTTP que se utilizará para la solicitud.
 * @param {Object} [body={}] - El cuerpo de la solicitud, que se enviará con métodos POST o PUT.
 * @returns {Promise<Object>} - Un objeto que representa la respuesta de la solicitud o un objeto de error.
 */


const consulta = async (url, method = "GET", body = {}) => {
  // console.log({url})
  // console.log({body})
  // console.log({method})
  let respuesta;

  try {
    let opciones;
    if (method == "POST" || method == "PUT") {
      console.log('entra en post o put')
      opciones = {
        method: method, // or 'PUT'
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (method == "DELETE") {
      console.log("entra en delete")
      opciones = {
        method: method,
      };
    }

    
    respuesta = await fetch(url, opciones);
    respuesta = respuesta.json()

    // if (respuesta.ok) respuesta = respuesta.json();
    // else {
    //   console.log('ruta mal')
    //   throw 'error'
    // }
    
  } catch (error) {
    console.log(error)
    respuesta=error

  }

  return respuesta;
};

module.exports = {
  consulta,
};

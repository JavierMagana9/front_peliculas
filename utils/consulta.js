const consulta = async (url, method = "GET", body = {}) => {
  console.log({url})
  console.log({body})
  console.log({method})
  let respuesta;

  try {
    let opciones;
    if (method == "POST" || method == "PUT") {
      console.log('entra en post')
      opciones = {
        method: method, // or 'PUT'
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (method == "delete") {
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

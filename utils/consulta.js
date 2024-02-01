const consulta = async (url, method = "GET", body = {}) => {
  try {
    let opciones;
    if (method == "POST" || method == "PUT") {
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

    let respuesta = await fetch(url, opciones);

    if (respuesta.ok) respuesta = respuesta.json();

    return respuesta;
  } catch (error) {
    
  }
};

module.exports = {
  consulta,
};

//traer el modelo
const { consulta } = require("../utils/consulta");

//getPeliss
// const getPelis = async (req, res) => {
//   try {
//     console.log("dentro getPelis");
//     let respuesta = await fetch(`${process.env.URL_BASE}/search`);
//     console.log(respuesta);

//     if (respuesta.ok) {
//       respuesta = await respuesta.json();
//       console.log(respuesta);
//       res.render("admin/cPanel", {
//         respuesta,
//       });
//     } else {
//       throw "no podemos mostrar las peliculas";
//     }
//   } catch (error) {}
// };
const getPelis = async (req, res) => {
  let respuesta = await consulta(`${process.env.URL_BASE}/search`);
  //let respuesta = await fetch(`${process.env.URL_BASE}/search`);
  //console.log(respuesta);

  res.render("admin/cPanel", {
    respuesta,
  });
};
// GET CREAR PELI
const getCrearPelis = async (req, res) => {
  res.render("admin/formCrear");
};
// POST CREAR PELI
const postCrearPelis = async (req, res) => {
  const url = `${process.env.URL_BASE}/createMovie`;

  const body = req.body;
  console.log("body crearPelis", body);
  const respuesta = await consulta(url, "POST", body);

  if (respuesta.ok) {
    respuesta.json;
    
  }
  //res.redirect('/')
};

//GET MODIFICAR PELI

//POST MODIFICAR PELI

module.exports = {
  getPelis,
  getCrearPelis,
  postCrearPelis,
};

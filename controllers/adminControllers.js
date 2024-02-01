//traer el modelo
const {consulta} = require('../utils/consulta')

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
    
      
      let respuesta = await consulta(`${process.env.URL_BASE}/search`)
      //let respuesta = await fetch(`${process.env.URL_BASE}/search`);
      //console.log(respuesta);
  
     
        res.render("admin/cPanel", {
          respuesta,
        });
     
  };
const crearPelis = async(req,res)=>{
    
    const url=`${process.env.URL_BASE}/peliculass`

    const body=req.body
    console.log("body crearPelis", body);
    const respuesta=await consulta(url,'POST',body)

    if(respuesta.ok){
        respuesta.json
    }

}

module.exports = { getPelis, crearPelis };

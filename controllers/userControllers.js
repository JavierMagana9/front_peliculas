const { consulta } = require("../utils/consulta");

const getIndexUser = async (req, res) => {
    res.render("user/indexUser")
}


const getPeliculas = async (req, res) => {

    let respuesta = await consulta(`${process.env.URL_BASE}/search`);
    console.log("dentro de user", respuesta.error)
    res.render("user/buscarPeli", {
        respuesta
    })

}

const verMasId = async (req,res)=>{

    console.log("probando el param",req.params.id)

    const id = req.params.id
    let url= `${process.env.URL_BASE}/search/peli/${id}`;
    const respuesta=await consulta(url)
    console.log("dentro de id",respuesta)
    res.render("user/verMasId", respuesta)
}



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
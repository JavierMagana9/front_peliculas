//traer el modelo
const { consulta } = require("../utils/consulta");


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
  res.render("admin/formCrear",{
    respuesta:null
  });
};
// POST CREAR PELI
const postCrearPelis = async (req, res) => {
  const url = `${process.env.URL_BASE}/createMovie`;
  const body = req.body;
  const file =req.file;
  console.log("body crearPelis", body);
  console.log("file crearPelis", file);

  const respuesta = await consulta(url, "POST", body);
console.log('rep',respuesta)
  
    res.render("admin/formCrear",{
       respuesta
    });

    // res.redirect('/admin/crear')
};

//GET MODIFICAR PELI
const getModificarPeli = async(req, res)=>{
    const id = req.params.id
    let url= `${process.env.URL_BASE}/search/peli/${id}`;
    const respuesta=await consulta(url)
    // console.log(respuesta)

    res.render('admin/formModificar',{
      error:respuesta.error,
      ...respuesta.respuesta[0]
    
    })

} 
//POST MODIFICAR PELI

const modificarPeli = async(req, res)=>{
  const body=req.body
  
  const id=body.id
  console.log(id)
  const url = `${process.env.URL_BASE}/editMovie/${id}`;

  
   const respuesta = await consulta(url, "PUT", body);
    console.log("modificar",respuesta)
  console.log("ID en modificar", respuesta.id)
    if(respuesta.error){
    //   res.render('admin/formModificar',{
    //     error:respuesta.error,
    //   ...respuesta.respuesta[0]
    //   })
    res.render('/admin/formModificar', {
      respuesta
    })
    }
  res.redirect('/admin')
}

//GET ELIMINAR 
const vistaEliminar=(req,res)=>{
    res.render('admin/eliminar')
}

//POST ELIMINAR


module.exports = {
  getPelis,
  getCrearPelis,
  postCrearPelis,
  getModificarPeli,
  vistaEliminar,
  modificarPeli
};

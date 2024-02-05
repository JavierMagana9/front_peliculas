
const firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyAEwZhJo2oQb24U1uoUf8jdzAFJd9b1yJo",
    authDomain: "fir-autenticacion-85d8d.firebaseapp.com",
    projectId: "fir-autenticacion-85d8d",
    storageBucket: "fir-autenticacion-85d8d.appspot.com",
    messagingSenderId: "402682994476",
    appId: "1:402682994476:web:1c89fea07525f009829689"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebaseAuth=firebase.getAuth(firebaseApp)
// const firebaseDB=firebase.getFirestore(firebaseApp)
const db = firebase.firestore();
const User = db.collection("Usuarios");
// const { getAuth } = require('firebase/auth');

//
const getLogin = (req, res) => {
    res.render('login', { errorMessage: null })
}


const getRegistro = (req, res) => {
    res.render('registro', { error: null })
}



//Registro de usuario
const registrarUsuario = async (req, res) => {

    try {
        const rol = "user"
        const favoritos = ["id1", "id2", "id3"]
        const { email, username, password, password2 } = req.body;

        if (password != password2) {
            //console.log("las contraseñas no son iguales")
            return res.render('registro', {
                error: "Las contraseñas son diferentes"
            })
        }
        // const data = req.body;
        // await User.add({ data });
        // res.send({ msg: "Usuario aniadido" });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Signed in
                var user = userCredential.user;
                const uid = user.uid
                // console.log("iddd", user.uid)
                console.log("Esta registrando", user);
                // const data = req.body;
                await User.add({ email, username, password, uid, rol, favoritos });
                // await User.update({idobtenidodelacoockie,pelicula });
                res.redirect('/');

            })
            .catch((error) => {

                let errorCode = error.code;
                let errorMessage = error.message;
                //let errorCampo="todos los campos son obligatorios"

                // res.render('registro',{errorCampo})
                console.log("Mensaje error===>", errorMessage, errorCode);
            });



    } catch (e) {
        console.log(e)
        //res.redirect('registrar');
    }

}





const loguearUsuario = async (req, res) => {
    try {


        const { email, password } = req.body;

        console.log("email", email);
        console.log("pass", password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                //     console.log("user", user);
                //     console.log("token", user.refreshToken)
                res.redirect("/user")
                //    res.send("Accedio rol Usuario");//ESTO TIENE QUE SER UN RES.REDIRECT
                //     // ...
                //     //  const token=firebase.auth().createCustomToken(email)
                //     //  console.log("token por lado del cliente",token)

            })
            .catch((error) => {
                console.log("error en login", error)
                let errorMessage = "usuario o contraseña no valido";
                // console.log("error", errormessage);
                res.render('login', { errorMessage })
            });

        // const token=firebase.auth().createCustomToken(email)
        // console.log("token por lado del cliente",token)

    } catch (e) {
        console.log(e)
    }
}


const logoutUsuario = (req, res) => {
     const body = res
    console.log("esta es la respuesta del logout",body)
    firebase.auth().signOut().then(() => {
            console.log("=========el usuario cerro sesion")
            res.redirect("/")
        })
        .catch((error) => {
                    console.log("logout==========", error)
                })
}

const authGoogle = (req,res)=>{
const resp=res

console.log("respuesta google",resp)

    const provider = new firebase.auth.GoogleAuthProvider()


    firebase.auth().signInWithPopup(provider).then((respuesta)=>{
console.log("se proceso con google",respuesta)
    }).catch((error)=>{
console.log("Hubo un erro en la Auth con google",error)
    })

    
    // firebase.auth().signInWithRedirect(provider).then((respuesta)=>{
    //     console.log("se proceso con google",respuesta)
    //         }).catch((error)=>{
    //     console.log("Hubo un erro en la Auth con google",error)
    //         })

}

const getRecuperarPass = (req,res)=>{
    res.render("recuPass", {
        error:null
    })
}

const postRecuperarPass = (req,res)=>{
    const email=req.body.email
    console.log("recibo en pass",email)

    const auth=firebase.auth();

      const configuracion = {
        url: "http://localhost:3000/"
      };

      auth.sendPasswordResetEmail(email, configuracion)
        .then(result => {
          console.log(result);
          res.redirect("/")
        })
        .catch(error => {
          console.log(error);
          res.render("recuPass",{error:error})
        });

}



module.exports = {
    registrarUsuario,
    getLogin, getRegistro, loguearUsuario, logoutUsuario,authGoogle,getRecuperarPass,postRecuperarPass
}


    
      

  
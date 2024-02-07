
const firebase = require('firebase')
const { User } = require('../config/firebaseConfig')
const cookieParser = require('cookie-parser')
const getLogin = (req, res) => {
    res.render('login', { errorMessage: null })
}


const getRegistro = (req, res) => {
    res.render('registro', { error: null })
}



//Registro de usuario
const registrarUsuario = async (req, res) => {

    try {
        const rol = "u"
        const favoritos = []
        const { email, username, password, password2 } = req.body;

        if (password != password2) {
            //console.log("las contraseñas no son iguales")
            return res.render('registro', {
                error: "Las contraseñas son diferentes"
            })
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)

            .then(async (userCredential) => {
                // Signed in
                let user = userCredential.user;
                const uid = user.uid
                // console.log("iddd", user.uid)
                //console.log("Esta registrando", user);
                // const data = req.body;
                await User.add({ email, username, password, uid, rol, favoritos });


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

        // console.log("email", email);
        // console.log("pass", password);
        // const userCredential=await firebase.auth().signInWithEmailAndPassword(email, password)
        // console.log("usercredet", userCredential)

        // const {user}=userCredential


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {

                let user = userCredential.user;

                const uid = user.uid
                const tokenAuth = user.Aa

                let coleccion = await User.get();
                const list = coleccion.docs.map((doc) => (doc.data()));

                // const uidFirestore = coleccion.doc('uid')

                // console.log("el uid del firestore ", uidFirestore)

                const resultado = list.find((items) => items.uid === uid);
                //console.log("Obteniendo valores del usuario: ",resultado);
                const rol = resultado.rol
                console.log("Obteniendo rol del usuario : ", resultado.rol);
                let body = {
                    uid,
                    rol
                }

                console.log("objeto dentro de cookie", body)

                res.cookie('xtoken', JSON.stringify(body), {
                    maxAge: 360000,
                    secure: true,
                })
                
            //    const cookie= req.cookies.xtoken
            //    console.log("cookie por parsear", cookie);
            //     let cookieP = JSON.parse(cookie)
            //     console.log("cookie parseada", cookieP)
                
            
                // const { rol:rolEnCookie } = cookieP
            
                // console.log("ROL", rolEnCookie)
                
                
                if (rol == "u") {
                    console.log("entra por el user=")
                    res.redirect("/user")
                } else if (rol == "a") {
                    console.log("entra por el admin==")
                    res.redirect("/admin")
                } else {
                    console.log("rechazado=====")
                    res.redirect("/")
                }

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
    
    
    firebase.auth().signOut().then(() => {
        console.log("=========el usuario cerro sesion")
        res.clearCookie('xtoken')
        res.redirect("/")
    })
        .catch((error) => {
            console.log("logout==========", error)
        })
}

const authGoogle = (req, res) => {
    const resp = res

    console.log("respuesta google", resp)

    const provider = new firebase.auth.GoogleAuthProvider()


    firebase.auth().signInWithPopup(provider).then((respuesta) => {
        console.log("se proceso con google", respuesta)
    }).catch((error) => {
        console.log("Hubo un error en la Auth con google", error)
    })


    // firebase.auth().signInWithRedirect(provider).then((respuesta)=>{
    //     console.log("se proceso con google",respuesta)
    //         }).catch((error)=>{
    //     console.log("Hubo un erro en la Auth con google",error)
    //         })

}

const getRecuperarPass = (req, res) => {
    res.render("recuPass", {
        error: null
    })
}

const postRecuperarPass = (req, res) => {
    const email = req.body.email
    console.log("recibo en pass", email)

    const auth = firebase.auth();

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
            res.render("recuPass", { error: error })
        });

}

const firestoreFavoritos = async (req, res) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => (doc.data()));
    res.send(list);
    console.log("dentro", snapshot)
}



module.exports = {
    registrarUsuario,
    getLogin, getRegistro, loguearUsuario, logoutUsuario, authGoogle, getRecuperarPass, postRecuperarPass,
    User
}






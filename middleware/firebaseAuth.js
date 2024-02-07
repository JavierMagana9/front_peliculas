const firebase = require('firebase')

const { User } = require('../config/firebaseConfig')

const firebaseAuth = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        console.log({ email })
        console.log({ password })

        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)

        //console.log("userCredential en el middleware",userCredential)

        if (!userCredential) {
            res.redirect('/')
        } else {
            let { uid, Aa: token } = userCredential.user;
            console.log("middleware uid", uid)
            console.log("middleware token", token)

            const body = {
                uid,
                token
            }
            res.cookie('xToken', JSON.stringify(body), {
                maxAge: 360000,
                secure: true,

            })
            next()
        }
    } catch (error) {
        console.log({ error })
    }



}

module.exports = { firebaseAuth }
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGING,
    appId: process.env.APPID
};

// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);
// const firebaseAuth=firebase.getAuth(firebaseApp)
// const firebaseDB=firebase.getFirestore(firebaseApp)


// ,{serviceAccountId: 'jorge-994@rosy-fiber-413408.iam.gserviceaccount.com'},


const db = firebase.firestore();
const User = db.collection("Usuarios");

module.exports={User,app}
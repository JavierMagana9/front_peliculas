const express = require('express');
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser')

const port = process.env.PORT 

const app = express();
/**
 * Middleware para utilizar los body
 */
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

/**
 * Middleware para servir archivos estáticos desde el directorio 'public'.
 */
app.use(express.static(__dirname + "/public"))

/**
 * Configuración de EJS como motor de plantillas y especificación de la carpeta de vistas.
 */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
/**
 * Middleware para habilitar CORS (Intercambio de Recursos de Origen Cruzado).
 */
app.use(cors())


app.use(cookieParser())

/**
 * Rutas para las secciones 'admin' y 'user' de la aplicación.
 */
app.use('/',require('./routers/authRouter'))
app.use('/admin', require('./routers/adminRouter'))
app.use('/user', require('./routers/userRouter'))

app.use((req, res)=>{
    res.status(404).send('404')
})

app.listen(port, ()=>{
    console.log(`A la escucha del puerto ${port}`)
})
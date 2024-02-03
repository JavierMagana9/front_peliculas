const express = require('express');
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser')

const port = process.env.PORT 

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(cors())
app.use(cookieParser())

app.use('/admin', require('./routers/adminRouter'))

app.use((req, res)=>{
    res.status(404).send('404')
})

app.listen(port, ()=>{
    console.log(`A la escucha del puerto ${port}`)
})
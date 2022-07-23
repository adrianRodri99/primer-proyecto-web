const express =require('express')
const bodyParser = require('body-parser')
const cors= require('cors')


const api=require('./rutas/api')
const port = 3000

const app= express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api',api)
app.get('/', function(req, res){
    res.send('Hola desde el servidor')
})


app.listen(port, function(){
    console.log('servicio q se ejecuta por el localhost'+ port)
})
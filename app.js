const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Ejs and asset
app.set('view engine','ejs') 
app.use(express.static('public'));



// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


io.on('connection', (socket) =>{
    console.log(`Connecté au client ID : ${socket.id}`)
 })


 app.get('/', function (req, res) {
    res.send('hello toky')
    console.log('ok')
 })

  

server.listen(3000, function () {
 console.log('App.js run port 3000 !')
})
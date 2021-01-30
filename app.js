// Servidor expres

const express = require('express')
const app = express()
const port = 3000

var session = require("express-session")

//Importamos la pagina donde tenemos CRUD

const crud = require('./crudUsuario')
//const middelware = require('./mi_middelware')

// Inicio configruacion Middelware

function logger(req, res, next){
  console.log(new Date(), req.url);
  next()
}

app.use(logger)

// Aqui vamos a decirle al servidor Express que necesitamos que tenga la funcionalidad de gestionar sesiones
// El unico campo obligatorio es secret, ya que usara esto como algorritmo para generar un codigo de sesion unico
app.use(session({
  secret: "kdikeilsok8f88f8f888kjkjas",
  resave: false,
  saveUninitialized: false
}))


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`El puerto se esta escuchando por: http://localhost:${port}`)
})


// --- CRUD ALTA ---

app.post('/alta', function(req, res, next){
  
  var email = req.body.email
  var password = req.body.password

  crud.alta_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).end()

  })
})

// --- CRUD MOSTAR ---

app.post('/mostrar', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crud.mostrar_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).json(test)

  })
})

// --- CRUD ACTUALIZAR ---

app.post('/actualizar', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crud.actualizar_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).end()

  })   
})

// --- CRUD ELIMINAR ---

app.post('/eliminar', function(req, res, next){
  
  var email = req.body.email

  crud.eliminar_usuario(email, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).end()

  })
})

// --- LOGIN ---

app.post('/webservice/login', function(req, res, next){
  
  var email = req.body.email
  var password = req.body.password

  crud.login(email, password, function(test){

    // Creamos una sesion para este usuario
    req.session.user_id = email
    console.log('sesion : ' + req.session.user_id)

    //Ejercicio, que se genere la sesion SOLO si se tuvo exito en la busqueda del usuario, es decir si exite....

    console.log(JSON.stringify(test));
    return res.status(200).end()
  })
})

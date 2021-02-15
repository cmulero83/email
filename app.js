const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const crudPromesas = require('./crudPromesas')
const login = require('./login')
const middelware = require('./mi_middelware')
//const cargaUsuarios = require('./cargaUsuarios')

const app = express()   // Servidor expres
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({     // Vamos a manejar sesiones
  secret: "kdikeilsok8f88f8f888kjkjas",     // Unico campo obligatorio, generamos un algoritmo
  resave: false,
  saveUninitialized: false
}))

app.use(middelware.logger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`El puerto se esta escuchando por: http://localhost:${port}`)
})



// CRUD CON PROMESAS

// --- ALTA USUARIO ---

app.post('/altaUsuario', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crudPromesas.altaUsuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ACTUALIZAR USUARIO ---

app.post('/actualizarUsuario', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crudPromesas.actualizarUsuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  }) 
})

// --- MOSTRAR USUARIO ---

app.post('/mostrarUsuario', function(req, res, next){
  
  var email = req.body.email
  crudPromesas.mostrarUsuario(email, function(test){
  
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)
  })

})

// --- ELIMINAR USUARIO ---

app.post('/eliminarUsuario', function(req, res, next){
      
  var email = req.body.email

  crudPromesas.eliminarUsuario(email, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
 
})

// --- LOGIN ---

app.post('/webservice/login', function(req, res, next){
  
  var email = req.body.email
  var password = req.body.password

  login.login(email, password, function(test){

    // Creamos una sesion para este usuario
    req.session.user_id = email
    console.log('sesion : ' + req.session.user_id)

    //Ejercicio, que se genere la sesion SOLO si se tuvo exito en la busqueda del usuario, es decir si exite....

    console.log(JSON.stringify(test));
    return res.status(200).json(test)
  })
})

// CRUD CORREO ALEATORIOS

// --- ALTA USUARIO ---

app.post('/alta', function(req, res, next){

  var id = req.body.id
  var email = req.body.email
  var nombre = req.body.nombre
  var apellido = req.body.apellido
  var pais = req.body.pais

  crudPromesas.alta(id, email, nombre, apellido, pais, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ACTUALIZAR USUARIO ---

app.post('/actualizar', function(req, res, next){

  var email = req.body.email
  var pais = req.body.pais

  crudPromesas.actualizar(email, pais, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  }) 
})

// --- MOSTRAR USUARIO ---

app.post('/mostrar', function(req, res, next){
  
  var email = req.body.email
  crudPromesas.mostrar(email, function(test){
  
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)
  })

})

// --- ELIMINAR USUARIO ---

app.post('/eliminar', function(req, res, next){
      
  var email = req.body.email

  crudPromesas.eliminar(email, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
 
})


/* app.post("/sessions", function(req, res) {
  User.findOne({ emial:req.body.email, password:req.body.password }, function(err, docs) {
    req.session.user_id = email
    red.status(200).end()
  })
}) */

/* // --- CRUD ALTA ---

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
}) */ 

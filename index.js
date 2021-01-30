const mysql = require('mysql')
const bcrypt = require ('bcrypt')
const readLineSync = require('readline-sync')  // Permite realizar INPUT.... (en desarrollo...) $ npm install readline-sync

console.log("\033[2J\033[0f") // Asi puedes borrar la pantalla del terminal para que sea mas limpio

// Declaracion de variables

let conexion
let opcion = 0

// Valores de conexion a la base de datos...

conexion = mysql.createConnection({
    host:'65.99.225.55',
    database:'mailshi1_alba',
    user:'mailshi1_alba',
    password:'Suerte05alba'
})

conexion.connect(function(err){
    if(!err)
        console.log('CONEXION EXITOSA');
    else
        throw err
})

// Hacer un menu

console.log('1.- Añadir un usuario...')
console.log('2.- Buscar un usuario')

opcion = readLineSync.question("Seleccion opcion: ")

if (opcion == 1){

    email = readLineSync.question("Escribe tu email: ")
    password = readLineSync.question("Escribe tu contraseña: ")
    alta_usuario(email,password)
}

if (opcion == 2){
    email = readLineSync.question("Escribe tu email: ")
    password = readLineSync.question("Escribe tu contraseña: ")
    mostar_usuario(email,password)
}

// COMENZAMOS HACER EL CRUD

// --- INSERTAR --- 

function alta_usuario(email, password){

    // Encriptar la contraseña...
    bcrypt.hash(password, 10, function(err, hash) {
        console.log(hash)
        if(!err){
            conexion.connect(function(err){
                if(err){
                    throw err
                }   
                else{
                    // Tengo conexion exitosa vamos a buscar primero queno se dio ya de alta...
                    // Creo la sentencia SQL el campo que voy a buscar es el de email
                    sql =`SELECT * FROM usuarios WHERE email = '${email}'`
                    // Conecto y ejecuto la sentencia, si devuelve 0 en la longigud de result es que no existe, si devuelve 1 es que ya exite...    
                    conexion.query(sql, function(err, result){
                        console.log(result.length)
                        if(result.length == 0){
                            console.log('Usuario Nuevo')
                            //Insertamos un nuevo usuario
                            sql = `INSERT INTO usuarios (email, password) VALUES ('${email}', '${hash}')`    
                            console.log(sql);
                            //Hacemos la conexiona la DB
                            conexion.query(sql, function(err, result){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(result);
                                }
                            })
                        }else{
                            console.log('Usuario ya exite')
                        }
                    })
                }       
            })
        }else{
            throw err
        }    
    })

} 

// --- MOSTRAR ---

function mostar_usuario(email, password){
    conexion.connect(function(err){
        if(err){
            throw err
        }else{
            sql = `SELECT * FROM usuarios WHERE email = '${email}'`
            conexion.query(sql, function(err, result){
                console.log(result[0].password);
                if(result[0].email == email){
                    console.log('Usuario encontrado')

                    // Desemcriptar contraseña
                    bcrypt.compare(password, result[0].password, function(err, hash){
                        console.log(hash);
                    })

                }else{
                    console.log('Usuario no encontrado'); 
                }  
            })   
        }
       
    })
}

// --- ACTUALIZAR --

/* conexion.query('UPDATE usuarios SET email = "Maria", password = "5678" WHERE email="damon" ', function(err, resultado) {
    if(!err)
        console.log('Registro actualizado', resultado);
    else
        console.log(err); 
}) */

// --- ELIMINAR ---

/* conexion.query('DELETE FROM usuarios WHERE email="alba" ', function(err, resultado) {
    if(!err)
        console.log('Registro borrado', resultado);
    else
        console.log(err); 
*/





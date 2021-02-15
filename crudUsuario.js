const mysql = require('mysql')
const bcrypt = require ('bcrypt')
const { database } = require('./config_db')

var conexion = mysql.createConnection(database)


// ---   CRUD ALTA   ---

/*
    Ult. Actualizacon: 30 de Enero 2021
    Descripcion: Esta funcion recibe por parametro (email y password) esta funcion va a crear un nuevo usuario en caso de que no exista.

    funcion: alta_usuario
    parametros: email, password
    devolucion: callback({'success':'true/false', 'menssage':'xxx', 'email': `${email}`, 'password':`${hash}`})
*/

function alta_usuario(email, password, callback){

    bcrypt.hash(password, 10, function(err, hash){          // Encriptamos el password

        if(!err){
           
            conexion.connect(function(err){         // Hacemos la conexion a la DB

                if(!err){

                    sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)

                    conexion.query(sql, function(err, result){          // Nos conectamos a la DB y ejecutamos nuestra sentecia SQL

                        if(result.length == 0){
                            
                            callback({'success':'true', 'menssage':'Usuario nuevo', 'email': `${email}`, 'password':`${hash}`})

                        }else{
                            
                            callback({'success':'false', 'menssage':'El usuario ya existe', 'email': `${email}`})
                        }
                        
                    })

                    sql = `INSERT INTO usuarios (email, password) VALUES ('${email}', '${hash}')`           // SQL (En caso de que no exista va insertar los varoles enla DB) 

                    conexion.query(sql, function(err, result){          // Nos conectamos a la DB y ejecutamos nuestra sentecia SQL
                        
                        if(!err){

                            callback({'success':'true', 'menssage':'Usuario insertado', 'email': `${email}`, 'password':`${hash}`})
                        
                        }else{
                            
                            callback({'success':'false', 'menssage':'Usuario NO insertado', 'email': `${email}`})
                        }
                    })

                }else{
                    console.log(err);
                }

                conexion.end()
            })
        }else{
            console.log('No se ha podido realizar la conexion a la DB');
        }
    })
}

// ---   CRUD MOSTRAR   ---

function mostrar_usuario(){

}


// --- CRUD ACTUALIZAR   ---

/*
    Ult. Actualizacon: 30 de Enero 2021
    Descripcion: Esta funcion recibe por parametro (email y password) y permite que se pueda actualizar el usuario.

    funcion: actualizar_usuario
    parametros: email, password
    devolucion: callback ({'success':'true/false', 'menssage':'xxx', 'email': `${email}`, 'password':`${hash}`})
*/

function actualizar_usuario(email, password, callback){

    conexion.connect(function(err){         // Creamos la conexion a la DB
        
        if(!err){

            bcrypt.hash(password, 10, function(err, hash){          // Encriptamos la contraseña

                if(!err){

                    sql = `UPDATE usuarios SET password = '${hash}' WHERE email = '${email}'`           // SQL (Actualizaremos la contraseña del email introducido)

                    conexion.query(sql, function(err, result){          // Nos conectamos a la DB y ejercutamos a la sentencia SQL

                        if(!err){

                            if(result.changedRows == 1){

                                callback({'success':'true', 'menssage':'Password actualizado', 'email': `${email}`, 'password':`${hash}`})

                            }else{
                                
                                callback({'success':'true', 'menssage':'Password NO actualizado ', 'email': `${email}`})
                            }

                        }else{

                            console.log(err);
                            
                        }
                    })

                }else{
                    console.log(err);
                    
                }
            })

        }else{
            console.log('No se ha podido conectar a la DB');
        
        }
    })   
}

// ---   CRUD ELIMINAR   ---

/*
    Ult. Actualizacon: 30 de Enero 2021
    Descripcion: Esta funcion recibe por parametro (email), si lo encuentra realiza el borrado de la base de datos.

    funcion: eliminar_usuario
    parametros: email
    devolucion: callback({'success':'true/false', 'menssage':'xxx', 'email': `${email}`})
*/

function eliminar_usuario(email, callback){

    conexion.connect(function(err){         // Creamos la conexion con la DB
        
        if(!err){
            
            sql = `SELECT * FROM usuarios WHERE email='${email}'`           // Instruccion SQL (buscara si existe el email introducido)
            
            conexion.query(sql, function(err, result){          // Conectamos con la DB y ejecutamos la sentencia SQL

                if(result.length == 0){
                    
                    callback({'success':'false', 'menssage':'Usuario no encontrado', 'email': `${email}`})
    
                }else{
                    
                    sql = `DELETE FROM usuarios WHERE email = '${email}'`           // Instruccion SQL (Eliminara el email introducido si existe )

                    conexion.query(sql, function(err, result){          // Conectamos con la DB y ejecutamos la sentencia SQL

                        if(result.affectedRows != 0){           
                            
                            callback({'success':'true', 'menssage':'Usuario borrado', 'email': `${email}`})
    
                        }else{
    
                            callback({'success':'false', 'menssage':'Hemos tenido un problema', 'email': `${email}`})
                        }
                    })
                }
            })

        }else{
            
            console.log('No se ha podido reqalizar la conexion a la DB');
        }
    })
}

// --- LOGIN ---

/*
    Ult. Actualizacon: 30 de Enero 2021
    Descripcion: Esta funcion recibe por parametro el email y password esta funcion nos muestra el usuario.

    funcion: login
    parametros: email, password
    devolucion: callback({'success':'true/false', 'menssage':'xxx', 'email': `${email}`, 'password':`${hash}`})
*/

function login(email, password, callback){

    conexion.connect(function(err){         //Hacemos la conexion a la DB

        if(!err){
            
            sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
                
            conexion.query(sql, function(err, result){          // Nos conectamos a la DB y ejecutamos la sentencia
                
                if (err){

                    callback({'success':'false', 'menssage':'Email incorrecto', 'email': `${email}`})

                }else{

                    if(result.length == 0){

                        callback({'success':'false', 'menssage':'Vacio'})

                    }else{
                        
                        bcrypt.compare(password, result[0].password, function(err, hash){           // Encriptamos la contraseña

                            callback({'success':'true', 'menssage':'Email correcto', 'email': `${email}`, 'password':`${hash}`})
                        })
                    }
                }   
            })

        }else{

            console.log('No se ha podido conectar a la DB')

        }
    })
}



module.exports = {
    'alta_usuario' : alta_usuario,
    'mostar_usuario' : mostrar_usuario,
    'actualizar_usuario' : actualizar_usuario,
    'eliminar_usuario' : eliminar_usuario,
    'login' : login,
}
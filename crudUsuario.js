const mysql = require('mysql')
const bcrypt = require ('bcrypt')

// Conexion base de datos 

let conexion

// Definir valores de conexion a la base de datos
/////////////////////////////

let HOST = '65.99.225.55'
let database_name = 'mailshi1_alba'
let database_user = 'mailshi1_alba'
let database_password = 'Suerte05alba'


//CRUD


// prueba de añadir a la BBDD
function prueba_anadir(email, password, callback){

    conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    conexion.connect(function(err){
        if (!err){
            sql = `INSERT INTO usuarios (email, password) VALUES ('${email}','${password}')`
            conexion.query(sql, function(err, result){
                console.log(result)
                console.log('error : ' + err)
                conexion.end() ////////-------
                callback({"campo":"oldld"})
            })

        }else{
            console.log('Error en la conexion')
            conexion.end() /////_______ Cerrar la conexion....
        }

    })




}

// --- ALTA ---

/*
    Ult. Actualizacon: 27 de Enero 2021
    Descripcion: Esta funcion recibe por parametro el email y password, esta funcion va a crear un nuevo usuario en caso de que no exista.

    funcion: alta_usuario
    parametros: email, password
    devolucion: callback con un archivo JSON
        {"success":true/false,
            datos[{
                "email":"xxxx",
                "password":"xxxx"
            }]
        }
*/

function alta_usuario(email, password, callback){

    conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //Encriptamos la contraseña
    bcrypt.hash(password, 10, function(err, hash){

        if(!err){
            conexion.connect(function(err){
                if(!err){
                    // Sentencia SQL 
                    sql = `SELECT * FROM usuarios WHERE email = '${email}'`
                    //Conectamos a la DB y ejecutamos la sentecia SQL
                    conexion.query(sql, function(err, result){

                        console.log(result.length);
                        if(result.length == 0){
                        console.log('Usuario nuevo');
                        // Crear el objeto JSON para devolucion
                        objeto = {"success":'true', 'datos':[]};
                        objeto.datos.push({
                        "email":`${email}`
                    })
                    callback(objeto)
                    //Insertamos un  nuevo usuaio
                    sql = `INSERT INTO usuarios (email, password) VALUES ('${email}','${hash}')`
                    console.log(sql);

                    //Hacemos la conexion a la DB
                    conexion.query(sql, function(err, result){
                        if(!err){
                           
                            console.log(result);
                            objeto = {"success":'true', "mensaje":"Insercion realizada correctamente",'datos':[]};
                            objeto.datos.push({
                                "email":`${email}`,
                                "password":`${password}`
                            })
                            conexion.end()
                            callback(objeto)
                        }else{
                        console.log(err);
                        objeto = {"success":'false',"mensaje":"Conexion no fue posible",'datos':[]};
                        objeto.datos.push({
                            "email":`${email}`,
                            "password":`${password}`
                        })
                        conexion.end()
                        callback(objeto)
                    }
                })
                }else{
                console.log('Usuario ya existe');
                objeto = {"success":'false',"mensaje":"Usuario ya existe", 'datos':[]};
                objeto.datos.push({
                    "email":`${email}`,
                    "password":`${password}`
                })
                conexion.end()
                callback(objeto)
            }
            })
            }else{
                console.log(err);
            }
        })
        }else{
            console.log(err);  
        }
    })
}

// --- MOSTRAR ---

/*
    Ult. Actualizacon: 27 de Enero 2021
    Descripcion: Esta funcion recibe por parametro el email y password esta funcion nos muestra el usuario.

    funcion: mostar_usuario
    parametros: email, password
    devolucion: callback con un archivo JSON
        {"success":true/false,
            datos[{
                "email":"xxxx", 
                "password":"xxxx"
            }]
        }
*/

function login(email, password, callback){

    conexion.connect(function(err){
        if(err){
            console.log(err); 
        }else{
            //Creamos la sentecia SQL
            sql = `SELECT * FROM usuarios WHERE email = '${email}'`
            //Hacemos la conexion a la DB
            conexion.query(sql, function(err, result){
            if (err){
                console.log('Error en la busqueda')
                
                // NO tenemos exito y lo  devolvemos como un JSON
                objeto = {"success": 'false', 'datos':[]}
                objeto.datos.push({
                    "email":`${email}`,
                    "password":`${password}`
                })

                callback(objeto)

            }else{

                if(result.length == 0){
                    console.log("Vacio")  
                }else{
                    console.log(result[0].password)
                    bcrypt.compare(password, result[0].password, function(err, hash){
                        console.log(hash)



                        // Tenemos exito y lo devolvemos en un JSON
                        objeto = {"success": `${hash}`, 'datos':[]}
                        objeto.datos.push({
                        "email":`${email}`,
                        "password":`${password}`
                    })

                    callback(objeto)
                    })
                }
            }


                 
            })   
        }
       
    })
}

// --- ACTUALIZAR

/*
    Ult. Actualizacon: 28 de Enero 2021
    Descripcion: Esta funcion recibe por parametro el email y password, permite que se pueda actualizar el usuario.

    funcion: actualizar_usuario
    parametros: email, password
    devolucion: callback con un archivo JSON
        {"success":true/false,
            datos[{
                "email":"xxxx", 
                "password":"xxx"
            }]
        }
*/

function actualizar_usuario(email, password, callback){
    
    console.log(password)

    conexion.connect(function(err){
        if(!err){
            bcrypt.hash(password, 10, function(err, hash){
                console.log(hash);
                if(!err){
                    sql = `UPDATE usuarios SET password = '${hash}' WHERE email = '${email}'`
                    conexion.query(sql, function(err, result){
                        if(!err){
                            console.log(result);
                            console.log(result.changedRows)
                            if(result.changedRows == 1){

                                // Tenemos exito devolvermos el JSON

                                objeto = {"success":'true', 'datos':[]};
                                objeto.datos.push({
                                    "email":`${email}`,
                                    "password":`${password}`
                                })

                                callback(objeto)

                            }else{
                                success = false
                                callback(objeto)
                            }
                        }else{
                            console.log(err);
                            success = false
                            callback(objeto)
                        }
                    })
                }else{
                    console.log(err);
                    success = false
                    callback(objeto)
                }
            })
        }else{
            console.log(err);
            success = false
            callback(objeto)
        }
    })

    
}

// --- ELIMINAR ---

/*
    Ult. Actualizacon: 27 de Enero 2021
    Descripcion: Esta funcion recibe por parametro el email, si lo encuentra realiza el borrado de la base de datos.

    funcion: eliminar_usuario
    parametros: email
    devolucion: callback con un archivo JSON
        {"success":true/false,
            datos[{
                "email":"xxxx"
            }]
        }
*/

function eliminar_usuario(email, callback){

    conexion.connect(function(err){
        if(err){
            console.log(err);
        }else{
            sql = `SELECT * FROM usuarios WHERE email='${email}'`  // Instruccion SQL
            conexion.query(sql, function(err, result){
                console.log(result.length);
                if(result.length == 0){
                    console.log('Usuario no encontrado');
                    // Crear el objeto JSON para devolucion
                    var objeto = {"success":'false','datos':[]}

                    objeto.datos.push({
                        "email":`${email}`,
                    })
                    callback(objeto)

                }else{
                    sql = `DELETE FROM usuarios WHERE email = '${email}'`
                    console.log(sql);
                    conexion.query(sql, function(err, result){
                        console.log(result.affectedRows);
                        if(result.affectedRows != 0){
                            console.log('Usuario borrado');
                            // Crear el objeto JSON para devolucion
                            var objeto = {"success":'true','datos':[]}

                            objeto.datos.push({
                                "email":`${email}`,
                            })
                            callback(objeto)

                        }else{
                            console.log('Hemos tenido un problema');
                            // Crear el objeto JSON para devolucion
                            var objeto = {"success":'false','datos':[]}

                            objeto.datos.push({
                                "email":`${email}`,
                            })
                            callback(objeto)
                        }
                    })
                }
            })
        }
    })
}



module.exports = {
    'alta_usuario' : alta_usuario,
    'login' : login,
    'actualizar_usuario' : actualizar_usuario,
    'eliminar_usuario' : eliminar_usuario,
    'prueba_anadir': prueba_anadir
}
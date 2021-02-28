const mysql = require('mysql')
const makeid = require('./utilidades/util')
const { database } = require('./utilidades/config_db')

var conexion = mysql.createConnection(database)

conexion.connect(function(err){
    
    if(!err) {

        console.log('Conexion exitosa');

        for(let i = 0; i < 5000; i++) {             // Generamos correos automaticos

            var email = makeid.makeid() + '@test.es'
            var nombre = makeid.makeid() 
            var apellido = makeid.makeid()
            var id = makeid.makeid()

            if(i > 2000) {
                pais = 'España'
            }else{
                pais = 'Alemania'
            }

            sql = `INSERT INTO correos_aleatorios ( id, nombre, apellido, email, pais ) VALUES ('${id}' ,'${nombre}', '${apellido}','${email}', '${pais}' )`
        
            conexion.query(sql, function(err, result) {

                if(!err){

                    console.log('Añadiendo correos aleatorios: ' + i);

                }else{

                    console.log(err);
                }

            })
        }

        conexion.end()

    } else {

        throw err      
    }
})



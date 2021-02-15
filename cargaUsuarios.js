const mysql = require('mysql')
const makeid = require('./util')
const { database } = require('./config_db')

var conexion = mysql.createConnection(database)


//var password = makeid.makeid()

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

                    //console.log('Se ha añadido correctamento lo datos a la base de datos');

                }else{

                    console.log(err);
                }
            })
        }

    }else {

        throw err
    }
})



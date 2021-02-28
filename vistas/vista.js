const mysql = require('mysql')
const { database } = require('../utilidades/config_db')

var conexion = mysql.createConnection(database)

conexion.connect(function(err) {
    if(!err) {
        console.log('Conexion exitosa');

        sql = `SELECT * FROM pais_vista`

        conexion.query(sql, function(err, result) {

            if(!err) {

                console.log('sin error');
            console.log(result[2].id)

            for(x of result) {          //Recore de manera automatica cada linea de result y el valor lo asigna a x
                console.log(x.pais);
            }

        }else{

            console.log(err);
        }
    })

}else{
    throw err
}
})
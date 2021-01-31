const mysql = require('mysql')
const bcrypt = require('bcrypt')
const util = require('util');

// Conectamos a la DB y defenimos los valores de la conexion a la BBDD

const HOST = '65.99.225.55'
const database_name = 'mailshi1_alba'
const database_user = 'mailshi1_alba'
const database_password = 'Suerte05alba'

//
// Funcion para el alta de usuarios...
//

async function alta_usuario_async(email, password, callback) {



    // Realizamos la conexion a la base de datos...
    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    // node native promisify
    const query = util.promisify(conexion.query).bind(conexion);

    try {


        // Creamos la secuencia SQL y lanzamos la peticion a la Base de datos..
        let sql = `SELECT * FROM usuarios WHERE email = '${email}'` // Vamos a buscar el usuarios...
        let result = await query(sql)

        // Añadir en la base de datos...
        sql = `INSERT INTO usuarios (email, password) VALUES ('${email}', '${password}')`
        result = await query(sql)
        console.log(result)


    } catch (error) {

        mensaje = error.sqlMessage
        success = false
        mensaje = error.sqlMessage

    } finally {
        conexion.end()

        callback({
            'success': `${ success }`,
            'mensaje': `${ mensaje }`,
            'email': `${ email }`,
            'password': `${ password }`
        })

    }


}

module.exports = {
    'alta_usuario_async': alta_usuario_async,

}
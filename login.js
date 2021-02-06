const mysql = require('mysql')
const util = require('util')
const bcrypt = require ('bcrypt')

// Conectamos a la DB y defenimos los valores

let HOST = '65.99.225.55'
let database_name = 'mailshi1_alba'
let database_user = 'mailshi1_alba'
let database_password = 'Suerte05alba'


// --- LOGIN ---

async function login (email, password, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //  NODE NATIVE PROMISIFY

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`          // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)
        console.log(result[0].password);
        
        let compararPassword = await bcrypt.compare(password, result[0].password)           // Comparamos el password

        if(compararPassword){

            message = 'Usuario existente'
            success = true 

        }else{

            message = 'Password erroneo'
            success = false
        }


    } catch (err) {
        console.log(err)

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`, 'password':`${password}`})
    }
    
}


module.exports = {
    'login': login
}
const mysql = require('mysql')
const util = require('util')
const bcrypt = require ('bcrypt')
const { database } = require('./utilidades/config_db')

var conexion = mysql.createConnection(database)


// --- LOGIN ---

async function login (email, password, callback) {

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

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})
    }
    
}


module.exports = {
    'login': login
}
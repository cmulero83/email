const mysql = require('mysql')
const bcrypt = require ('bcrypt')
const util = require('util')

const makeid = require('./utilidades/util')
const nodemail = require('./nodemail')

// Conectamos a la DB y defenimos los valores

let HOST = '65.99.225.55'
let database_name = 'mailshi1_alba'
let database_user = 'mailshi1_alba'
let database_password = 'Suerte05alba'


// --- CRUD ALTA USUARIO ---

async function altaUsuario (email, password, id, empresa, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //  NODE NATIVE PROMISIFY

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        const hash = bcrypt.hashSync(password, 10);         // Encriptar password
        console.log(hash);

        var id = makeid.makeid()

        sql = `INSERT INTO usuarios (email, password, id, empresa) VALUES ('${email}','${hash}','${id}', '${empresa}')`            // SQL (En caso de que no exista va insertar los varoles en la DB)
        let result = await query(sql)
        console.log(result);

        message = 'Se ha realizado con exito la operacion'
        success = true

        nodemail.enviarCorreo(email)         // Aqui voy a enviar un correo al nuevo usuario

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`, 'password':`${password}`, 'id':`${id}`, 'empresa':`${empresa}`})

    }
}

// --- CRUD MOSTAR USURIO ---

async function mostrarUsuario (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario introducido no existe'
            success = false 
            
        } else {

            message = 'Usuario encontrado'
            success = true
                       
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}

// --- CRUD ACTUALIZAR USUARIO ---

async function actualizarUsuario (email, password, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a la DB

    try {

        const hash = bcrypt.hashSync(password, 10);         // Encriptar password
        console.log(hash);

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario no existe'
            success = false

        } else {
            
            sql = `UPDATE usuarios SET password = '${hash}' WHERE email = '${email}'`           // SQL (Actualizaremos la contraseña del email introducido)
            result = await query(sql)

            message = 'Contraseña actualizada con exito'
            success = true
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`, 'password':`${password}`})

    }
}

// --- CRUD ELIMINAR USUARIO ---

async function eliminarUsuario (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El email introducido no existe'
            success = false

        } else {

            sql = `DELETE FROM usuarios WHERE email = '${email}'`           // Instruccion SQL (Eliminara el email introducido si existe)
            result = await query(sql)

            message = 'Email eliminado con exito'
            success = true

        } 

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}

// CRUD CORREO ALEATORIO

// --- CRUD ALTA USUARIO ---

async function alta ( id, email, nombre, apellido, pais, id_usuarios, callback) {

    // Generar el id del usuario
    id = makeid.makeid()

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //  NODE NATIVE PROMISIFY

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        sql = `INSERT INTO correos_aleatorios (id, email, nombre, apellido, pais, id_usuarios) VALUES ('${id}','${email}', '${nombre}', '${apellido}', '${pais}', '${id_usuarios}')`            // SQL (En caso de que no exista va insertar los varoles en la DB)
        let result = await query(sql)
        console.log(result);

        message = 'Se ha realizado con exito la operacion'
        success = true

        nodemail.enviarCorreo(email)         // Aqui voy a enviar un correo al nuevo usuario

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`,'id':`${id}`, 'email':`${email}`, 'nombre':`${nombre}`, 'apellido':`${apellido}`, 'pais':`${pais}`, 'id_usuarios':`${id_usuarios}`})
        
        
    }
}

// --- CRUS MOSTAR USAURIO ---

async function mostrar (id_usuarios, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE id_usuarios = '${id_usuarios}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'Correo no encontrado'
            success = false 
            resultado = null
            
        } else {

            message = 'Correos encontrados'
            success = true
            resultado = result
            console.log(resultado[0].id_usuarios);
                       
        }

    } catch (err) {

        message = err.sqlMessage
        success = false
        resultado = null

    } finally {

        callback(resultado)

        conexion.end()

        //callback({'success':`${success}`, 'message':`${message}`, 'id_usuarios':`${id_usuarios}`, 'resultado':`${resultado}`})
        
    }
}

// --- CRUD ACTUALIZAR USUARIO ---

async function actualizar (nombre, apellido ,email, pais, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a la DB

    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario no existe'
            success = false

        } else {

            sql = `UPDATE correos_aleatorios SET nombre = '${nombre}', apellido = '${apellido}', pais = '${pais}' WHERE email = '${email}'`           // SQL (Actualizaremos la contraseña del email introducido)
            result = await query(sql)

            message = 'Actualizado con exito'
            success = true
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'nombre':`${nombre}`, 'apellido':`${apellido}` , 'email':`${email}`, 'pais':`${pais}`})

    }
} 

// --- CRUD ELIMINAR USUARIO ---

async function eliminar (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)        

        if (result.length == 0) {

            message = 'Usuario no encontrado'
            success = false 

        } else {

            sql = `DELETE FROM correos_aleatorios WHERE email = '${email}'`           // Instruccion SQL (Eliminara el email introducido si existe)
            console.log(sql);
            result = await query(sql)

            message = 'Email eliminado con exito'
            success = true

        } 

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}


module.exports = {
    'altaUsuario' : altaUsuario,
    'actualizarUsuario' : actualizarUsuario,
    'mostrarUsuario' : mostrarUsuario,
    'eliminarUsuario' : eliminarUsuario,
    'alta' : alta,
    'actualizar' : actualizar,
    'mostrar' : mostrar,
    'eliminar' : eliminar
}
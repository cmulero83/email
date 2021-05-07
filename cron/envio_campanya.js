////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 
// Ult. Actualizacion: 
// Ver. 0 
// Descripcion: Aqui se realizara el envio de correos
///////////////////////////////////////////

const mysql = require('mysql')
const util = require('util')
const nodemailer = require('nodemailer')

let HOST = '65.99.225.55'
let database_name = 'mailshi1_alba'
let database_user = 'mailshi1_cron'
let database_password = 'cronusuario12'

const conexion = mysql.createConnection({
    host: HOST,
    database: database_name,
    user:database_user,
    password: database_password
})

main()

async function main() {

    try {

        conexion.connect()

        // Reisar si tenemos alguna campaña que procesar...
        let result = await revisar_campanya()
        

        console.log(result)

        // Si result != 0, es porque tenemos camapañas que procesar.....
        if (result.length != 0){

            // Vamos a realizar un bucle con las campañas....
            for (n=0; n < result.length; n++) {
                console.log(n);
                console.log(result[n].id_usuarios);

                // Aqui traemos los datos de configuracion

                let datos_confi = await devolucion_datos_smpt(result[n].id_usuarios)
                

                // Aqui llamamos a la funcion para traer la plantilla de la campaña 

                let plantilla = await devuelve_plantilla_campanya(result[n].id_campanya)
                

                // Aqui llamos a la funcion para quenos traiga los correos a los que ahi que enviarles la campaña

                let correos = await devuelve_envio_correos(result[n].id_usuarios)
               

                // Iniciamos el envio de correo
                await envio_correo(datos_confi, plantilla, correos)

            }


        }

    } catch (err){

       console.log(err);

    } finally {

        conexion.end()
    }
}

// Esta funcion revisa si ahi alguna campaña activa, campañas que el campos estado no tenga CLS

async function revisar_campanya(callback) {

    const query = util.promisify(conexion.query).bind(conexion)  

    sql = `SELECT * FROM envio_campanya WHERE estado =""`
    let result = await query(sql)
    return result

 
}

// Esta funcion trae la campaña

async function devuelve_plantilla_campanya(id_campanya, callback) {

    try{    
        
        const query = util.promisify(conexion.query).bind(conexion)

        sql = `SELECT plantilla FROM plantillas_correo WHERE id = '${id_campanya}'`
        let result = await query(sql)
        return result


    }catch(err){

        console.log(err)

    }
    
}


// Esta funcion nos devuelve los contacto del usuario a los que ahi que enviarles el correo de la campaña
// Esta funcion devolvera 10 contactos a los que no se les halla enviado ya la plantilla

async function devuelve_envio_correos(id_usuarios) {

    try {

        const query = util.promisify(conexion.query).bind(conexion)

        sql = `SELECT * FROM correos_aleatorios WHERE id_usuarios = '${id_usuarios}' LIMIT 10`
        result = await query(sql)
        return result 

    }catch (err) {

        console.log(err);

    }
}

// Devolvemos los datos de la configuracion SMPT

async function devolucion_datos_smpt (id_usuarios) {

    try {

        const query = util.promisify(conexion.query).bind(conexion)

        sql = `SELECT * FROM SMPT_configuracion WHERE id_usuarios = '${id_usuarios}'`
        result = await query(sql)
        return result

    }catch(err) {

        console.log(err);

    }
}

// Aqui vamos a enviar el correo

async function envio_correo(data_conexion, plantilla, correo) {

    try {

        console.log("Data conexion", data_conexion);
        console.log("plantilla", plantilla);
        console.log("emial", correo);
        console.log("data host", data_conexion[0].host);

        let jConfig = {
            "host":`${data_conexion[0].host}`,
            "port":`${data_conexion[0].port}`,
            "secure":true,
            "auth":{
                "type":"login",
                "user":`${data_conexion[0].username}`,
                "pass":`${data_conexion[0].password}`
            }
        }

        for(i=0; i < correo.length; i++) {
            
            let email = {
                from:`${data_conexion[0].send_mail}`,            // Remitente
                to:`${correo[i].email}`,                                   // Destinatario
                subject:"Pruebas de correo electronico",         // Asusto del correo
                html:`
                <div>
                    <p>Esto es un prueba</p>
                    <p>Enviendo correos electronicos con Nodemailer en NodeJS</p>
                </div>`
            }

            let createTransport = nodemailer.createTransport(jConfig)

            createTransport.sendMail(email, function(err, info){

                if(err) {

                    console.log("Error al enviar el email");
                    console.log(err);

                } else{

                    console.log("Correo enviado con exito");

                }

                createTransport.close()
            })
        }

    }catch (err) {

        console.log(err);
    }
}
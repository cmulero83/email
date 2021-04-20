////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 19/04/2021
// Ult. Actualizacion: 19/04/2021
// Ver. 0 
// parametros: no aplica
// Descripcion: Activacion de los botones de la pagina
///////////////////////////////////////////

$('#btn-agregar-usuario').click(function(e) {
    agregar_usuario_db(e)
})

////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 19/04/2021
// Ult. Actualizacion: 19/04/2021
// Ver. 0
// funcion: agregar_usuario_db()
// parametros: no aplica
// Descripcion: Es llamada desde el formulario de alta de nuevos usuarios.
///////////////////////////////////////////

function agregar_usuario_db(e) {
    let id = $("#id").val()
    let nombre = $("#nombre").val()
    let apellido = $("#apellido").val()
    let email = $("#email").val()
    let pais = $("#pais").val()
    const data = {
        "id":`${id}`,
        "nombre":`${nombre}`,
        "apellido":`${apellido}`,
        "email":`${email}`,
        "pais":`${pais}`
    }

    jQuery.ajax({
        
        url: '/alta',
        data: data,
        type: 'POST',
        dataType: 'json'

    }).then(function(response) {

        console.log(response);

        if(response.success == "true") {

            console.log("success es True")
            // Levantamos el modal de exito 
            $('#modal_agregar_usuario_db').modal('show')
            let mensaje = 'Usuario añadido correctamente'
            // Aqui hacemos que se oueda ver el nesaje que queremos mostrar
            $('#modal_agregar_usuario_db').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha del modal y redirigimos a la pag
            $('#btn_modal_exito_error').click(function() {
                $(location).attr("href", "/contactos.html");
            })

        }else {

            console.log("success es False")
            // Levantamos el modal de exito 
            $('#modal_agregar_usuario_db').modal('show')
            let mensaje = 'Upsss.. hemos tenido un problema para agregar a la DB vulva intentarlo'
            // Aqui hacemos que se oueda ver el nesaje que queremos mostrar
            $('#modal_agregar_usuario_db').find('.modal-body p').text(mensaje)
            // Recargar el modal
            $('#btn_modal_exito_error').click(function() {
                $(location).attr("href", "/contactos.html");
            })
        }
    
    }).catch(function(e) {
        console.log(e);
    })
}

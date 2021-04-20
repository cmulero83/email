$(document).ready(function() {

    ////////////////////////////////
    // Autor. Alba Mulero
    // Fecha creacion: 13/04/2021
    // Ult. Actualizacion: 13/04/2021
    // Ver. 0 
    // parametros: no aplica
    // Descripcion: Activacion de los botones de la pagina
    /////////////////////////////////////////// 

    $('#alta-usuario-boton-enviar').click(function(e) {
        alta_nuevo_usuario(e)
    })

    ////////////////////////////////
    // Autor. Alba Mulero
    // Fecha creacion: 13/04/2021
    // Ult. Actualizacion: 13/04/2021
    // Ver. 0
    // funcion: alta_nuevo_usuario()
    // parametros: no aplica
    // Descripcion: Es llamada desde el formulario de alta de nuevos usuarios.
    /////////////////////////////////////////// 

    function alta_nuevo_usuario(e){

        let email = $("#email").val()
        let password = $("#password").val()
        let empresa = $("#empresa").val()

        const data = {
            "email":`${email}`,
            "password":`${password}`,
            "empresa":`${empresa}` 
        }

        jQuery.ajax({

            url:'/altaUsuario',
            data: data,
            type: 'POST',
            dataType: 'json'
        
        }).then(function(response) {
            console.log("Valor del response" , response.success);

            // Queremos saber si sucess es TRUE o FALSE

            if(response.success == "true") {
                console.log("success es True")

                // Levantamos el modal de exito 
                $('#modal_alta_usuario').modal('show')

                let mensaje = 'El usuario ha registrado con exito'

                // Aqui hacemos que se oueda ver el nesaje que queremos mostrar
                $('#modal_alta_usuario').find('.modal-body p').text(mensaje)
        
                // Ponemos el boton a la escucha del modal y redirigimos a la pag
                $('#btn_modal_exito_error').click(function() {
                    $(location).attr("href", "/index.html");
                })

            }else {
                console.log("success es False")

                // Levantamos el modal de error
                $('#modal_alta_usuario').modal('show')

                let mensaje_err = 'Upps.. Hemos tenido un problema vuelve intentarlo'

                // Aqui hacemos que se oueda ver el nesaje que queremos mostrar
                $('#modal_alta_usuario').find('.modal-body p').text(mensaje_err)
                
                // Ponemos el boton a la escucha del modal y redirigimos a la pag
                $('#btn_modal_exito_error').click(function() {
                    $(location).attr("href", "/registro.html");
                })
            }
        
        }).catch(function(e){
            console.log("Valor del response" , response.success);
            console.log(e) 
        })
    }
})
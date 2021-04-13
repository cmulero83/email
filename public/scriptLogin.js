$(document).ready(function() {

    ////////////////////////////////
    // Autor. Alba Mulero
    // Fecha creacion: 13/04/2021
    // Ult. Actualizacion: 13/04/2021
    // Ver. 0 
    // parametros: no aplica
    // Descripcion: Activacion de los botones de la pagina
    ///////////////////////////////////////////

    $('#boton-login').click(function(e) {
        login(e)
    })

    $('#btn_modal_exito_login').click(function() {
        $(location).attr("href", "/entrada.html");
    })
    
    $('#btn_modal_error_login').click(function() {
        $(location).attr("href", "/index.html");
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

    function login(e) {
        let email = $("#email").val()
        let password = $("#password").val()

        const data = {
            "email":`${email}`,
            "password":`${password}`
        }

        jQuery.ajax({
            
            url: '/webservice/login',
            data: data,
            type: 'POST',
            dataType: 'json'

        }).then(function(response) {
            console.log(response);

            if(response.success == "true") {
                console.log("success es True")
    
                // Levantamos el modal de exito 
                $('#modal_login_exito').modal('show')
    
            }else {
                console.log("success es False")
    
                // Levantamos el modal de error
                $('#modal_login_error').modal('show')
            }
        
        }).catch(function(e) {
            console.log(e);
        })
    }
})
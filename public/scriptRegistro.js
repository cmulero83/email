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

$('#btn_modal_exito_usuario').click(function() {
    $(location).attr("href", "/index.html");
})

$('#btn_modal_error_usuario').click(function() {
    $(location).attr("href", "/registro.html");
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
        console.log(response);

        // Queremos saber si sucess es TRUE o FALSE

        if(response.success == "true") {
            console.log("success es True")

            // Levantamos el modal de exito 
            $('#modal_alta_usuario_exito').modal('show')

        }else {
            console.log("success es False")

            // Levantamos el modal de error
            $('#modal_alta_usuario_error').modal('show')
        }
        
    }).catch(function(e){
        console.log(e)
    })
}






})

// Menejo de eventos para el modal...

$('.modal').on('show.bs.modal', function(event){

    alert('show.bs.modal')
    
    var modal = $(this)
    modal.find('.modal-body #respuesta-alta').val('prueba')

})
////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 27/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0 
// parametros: no aplica
// Descripcion: Activacion de los botones de la pagina
///////////////////////////////////////////

$('#btn-agregar-nueva-campanya').click(function() {
    agregar_nueva_campanya()
})

///////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 27/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0
// funcion: agregar_nueva_campanya()
// parametros: no aplica
// Descripcion: Es llamada desde el formulario de alta la nueva campaña.
///////////////////////////////////////////

function agregar_nueva_campanya() {

    let id = $("#id").val()
    let descripcionCorta = $("#descripcionCorta").val()
    let descripcionLarga = $("#descripcionLarga").val()
    let plantilla = $("#plantilla").val()

    const data = {
        "id":`${id}`,
        "descripcionCorta":`${descripcionCorta}`,
        "descripcionLarga":`${descripcionLarga}`,
        "plantilla":`${plantilla}`
    }

    jQuery.ajax({
        
        url:'/alta_crear_campanya',
        data:data,
        type:'POST',
        dataType:'json'

    }).then(function(response) {
        console.log('Response nueva campaña', response);

        if(response.success == "true") {

            // Levantamos el modal
            $('#modal_nueva_campanya').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje = 'La nueva campaña se ha agregado con exito'
            // Aqui hacemos que se vea nuestro mensaje
            $('#modal_nueva_campanya').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_nueva_campanya').click(function() {
                $(location).attr("href", "/entrada.html")
            })
            

        } else {

            // Levantamos el modal
            $('#modal_nueva_campanya').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje= 'No se ha podido agregar la nueva campaña'
            // Aqui hacemos que se vea nuestro mensaje
            $('modal_nueva_campanya').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_nueva_campanya').click(function() {
                $(location).attr("href", "/crearCampanya.html")
            })
        }
    })
}


// -- MOSTRAR LAS CAMPAÑAS QUE YA TENEMOS REGISTRADAS -- 

jQuery.ajax({

    url:'/mostrar_campanya',
    type:'POST',
    dataType:'json'

}).then(function(response) {
    console.log('Response mostrar campañas: ', response);

    for(i=0; i < response.lenght; i++) {

        // Creamos la filas necesarias para cada elemento

        var fila = document.createElement('tr')
        fila.scope = 'row'
        fila.id = i

        // Creamos las columnas dentro de las filas

        var columna = document.createElement('td')
        columna.innerHTML = response[i].id

        var columna1 = document.createElement('td')
        columna1.innerHTML = response[i].descripcionCorta

        columna2 = document.createElement('td')
        columna2.innerHTML = response[i].descripcionLarga

        columna3 = document.createElement('td')
        columna3.innerHTML = response[i].plantilla
        
        /* var columnaEditar = document.createElement('td')
        columnaEditar.innerHTML = ''
        
        var columnaBorrar = document.createElement('td')
        columnaBorrar.innerHTML = '' */

        // Añadimos los elementos
        
        document.getElementById('tbody').appendChild(fila)
        document.getElementById(i).appendChild(columna)
        document.getElementById(i).appendChild(columna1)
        document.getElementById(i).appendChild(columna2)
        document.getElementById(i).appendChild(columna3)
        /* document.getElementById(i).appendChild(columnaEditar)
        document.getElementById(i).appendChild(columnaBorrar) */
    }
})
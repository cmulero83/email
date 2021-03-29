$(document).ready(function(){

    let data = {id_usuarios:"e1"}

    jQuery.ajax({

        url:'/mostrar',
        data: data,
        type:'POST',
        dataType: 'json'

    }).then(function(response){

        console.log(response);
        
        for(i=0; i < response.length; i++) {
            
            // Creo la fila

            var fila = document.createElement('tr')
            fila.scope = 'row'
            fila.id = i

            // Creo columnas dentro de la fila

            var columna = document.createElement('td')
            columna.innerHTML = response[i].id

            // Creamos la columna 1 pondremos el nombre

            var columna1 = document.createElement('td')
            columna1.innerHTML = response[i].nombre

            // Creamos la columna 2 pondremos el apellido

            var columna2 = document.createElement('td')
            columna2.innerHTML = response[i].apellido

            // Creamos la columna 3 pondremos el email

            var columna3 = document.createElement('td')
            columna3.innerHTML = response[i].email

            // Creamos la columna 4 pondremos el pais

            var columna4 = document.createElement('td')
            columna4.innerHTML = response[i].pais

            // Creamos el boton editar

            var columnaActualizar = document.createElement('td')
            columnaActualizar.innerHTML = '<div class="d-grid gap-2 d-md-flex justify-content-md-end"><button class="btn btn-editar me-md-2 " type="button" data-bs-toggle="modal" data-bs-target="#modal_editar"><i class="bi bi-pencil"></i></button><div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="editar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><form action="/actualizar" method="POST"><h2>Editar usuario</h2><div class="col-auto"><label for="exampleInputEmail1" class="form-label" for="inputPassword6">Id</label></div><div class="mb-3"><input type="string" class="form-control" id="exampleInputEmail1" for="inputPassword6" value='+response[i].id+' name="id"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Nombre</label><input type="string" class="form-control" id="exampleInputEmail1" name="nombre" value='+response[i].nombre+'></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Apellido</label><input type="string" class="form-control" id="exampleInputEmail1" name="apellido" value='+response[i].apellido+'></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Email</label><input type="email" class="form-control" id="exampleInputEmail1" name="email" value='+response[i].email+'></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Pais</label><input type="string" class="form-control" id="exampleInputEmail1" name="pais" value='+response[i].pais+'></div><br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-editar">Editar</button></div></form></div></div></div></div></div>'
            
            // Creamos el boton el boton eliminar

            var columnaEliminar = document.createElement('td')
            columnaEliminar.innerHTML = '<button type="button" class="btn btn-eliminar" data-bs-toggle="modal" data-bs-target="#borrar"><i class="bi bi-trash"></i></button><div class="modal fade" id="borrar" tabindex="-1" aria-labelledby="borrar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button></div><div class="modal-body"><h5 id="titulo-borrar">¿Seguro que desea eliminar?</h5></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="button" class="btn btn-eliminar" onclick="eliminar(\''+response[i].email+'\')">Aceptar</button></div></div></div></div>'

            // Añado los elementos

            document.getElementById('tbody').appendChild(fila)

            document.getElementById(i).appendChild(columna)
            document.getElementById(i).appendChild(columna1)
            document.getElementById(i).appendChild(columna2)
            document.getElementById(i).appendChild(columna3)
            document.getElementById(i).appendChild(columna4)
            document.getElementById(i).appendChild(columnaActualizar)
            document.getElementById(i).appendChild(columnaEliminar)

        }   
    })
    //

    console.log('onready lalalalala')  
    
    $("#modal_editar").on('show.bs.modal', function (event) {
        console.log("modal_editar");
        console.log(event)
        /* var button = $(event.relatedTarget) // Button that triggered the modal
     var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient) */
    }) 
})



function eliminar (correo) {

    const Url = 'http://localhost:3000/eliminar'
    const data = {
        "email":`${correo}`
    }

    console.log(data);
    console.log(correo);

    $.post(Url, data, function(data, status) {
        console.log(data);
        console.log(status);
        location.reload()
    })
}

function actualizar(id, id_usuarios, nombre, apellido, email, pais) {

    console.log(id_usuarios);
    console.log(id);
    console.log(nombre);
    console.log(apellido);
    console.log(email); 
    console.log(pais);
}


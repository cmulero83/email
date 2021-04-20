jQuery.ajax({

    url:'/mostrar_config_email',
    type:'POST',
    dataType: 'json'

}).then(function(response) {
    console.log(response);

    if(response.success == "false") {
        console.log("El formulario esta vacio");
    }else{
        console.log("El usuario esta completo");
    }

})
var request = require("request");
var baseUrl = 'http://localhost:3000'

// Generando un correo aleatoriamente

var email = makeid() + '@test.es'
var password = makeid()

// console.log(email);
// console.log(password);

// Generamos en JSON que tienes POSTMAN

var data = `{"email":"${email}", "password":"${password}"}`
var json_obj = JSON.parse(data)
console.log(data);
console.log(json_obj);


describe('Comprobar si tenemos el servidor arriba', function() {
    it('Retorna 200', function(done){
        request.get(baseUrl, function(err, response, body){
            expect(response.statusCode).toBe(200)
            done()
        })
    })
}) 

describe('Vamos añadir un usuario a la DB', function() {
    it('Vamos a comprobar 200, que la cadena llegue y devuelve true y se dio de alta', function(done) {
        request.post({
            url: baseUrl + '/altaUsuario',
            form: json_obj
        }, function(err, response, body) {
            let test = JSON.parse(body)
            expect(response.statusCode).toBe(200)
            expect(test.success).toBe('true')
            done()
        })
    })
     it('Vamos a comprobar 200, que la cadena llegue y devuelve false, es duplicado', function(done) {
        request.post({
            url: baseUrl + '/altaUsuario',
            form: json_obj
        }, function(err, response, body) {
            let test1 = JSON.parse(body)
            expect(response.statusCode).toBe(200)
            expect(test1.success).toBe('false')
            done()
        })
    }) 
})

describe('Vamos a eliminar un usuario', function() {
    it('Vamos a comprabar 200, que la cadena llega y devuelve true, usuario borrado', function(done) {
        request.post({
            url: baseUrl + '/eliminarUsuario',
            form: json_obj
        }, function(err, response, body) {
            let test2 = JSON.parse(body)
            expect(response.statusCode).toBe(200)
            expect(test2.success).toBe('true')
            done()
        })
    })
})



function makeid() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
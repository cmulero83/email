var request = require("request");
var baseUrl = 'http://localhost:3000'
var crudPromesas = require('../../crudPromesas')
var makeid = require('../../util')

/* describe('Server', () => {
    var server;

    beforeAll(() => {
        server = require('../../app')
    })

    afterAll(() => {
        server.close()
    })
}) */

// Generando un correo aleatoriamente

var email = makeid.makeid() + '@test.es'
var password = makeid.makeid()

// Generamos en JSON que tienes POSTMAN

var data = `{"email":"${email}", "password":"${password}"}`
//var json_obj = JSON.parse(data)

try { var json_obj = JSON.parse(data) } catch (e) { console.log(e) }            // Vamos a controlar un posible err al hacer el parse

console.log(data);
console.log(json_obj);


/* describe('GET /', () => {
    beforeAll((done) => {
        request.get(baseUrl, (err, response, body) => {
            data.status = response.statusCode;
            data.body = body
            done()
        })
    })
    it("Status 200", () => {
        expect(data.status).toBe(200)
    })
    it('Body', () => {
        expect(data.body).toBe('Hola soy el body')
    })
}) */


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

describe('Vamos a mostrar un usuario', function() {
    it('Vamos a comprabar 200, que la cadena llega y devuelve true, muestra el usuario', function(done) {
        request.post({
            url: baseUrl + '/mostrarUsuario',
            form: json_obj
        }, function(err, response, body) {
            let test2 = JSON.parse(body)
            expect(response.statusCode).toBe(200)
            expect(test2.success).toBe('true')
            done()
        })
    })
})

describe('Vamos a actualizar un usuario', function() {
    it('Vamos a comprabar 200, que la cadena llega y devuelve true, usuario actualizado', function(done) {
        request.post({
            url: baseUrl + '/actualizarUsuario',
            form: json_obj
        }, function(err, response, body) {
            let test2 = JSON.parse(body)
            expect(response.statusCode).toBe(200)
            expect(test2.success).toBe('true')
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

// Aqui vamos a probar el CRUD individualmente

describe('Probamos el CRUD', function() {
    it('Alta usario', function(done) {

        crudPromesas.altaUsuario(email, password, function(test){

            expect(test.success).toBe('true')
            done()
        })
    })
    it('Mostrar usuario', function(done) {

        crudPromesas.mostrarUsuario(email, function(test){

            expect(test.success).toBe('true')
            done()
        })
    })
    it('Actualizar usuario', function(done) {

        crudPromesas.actualizarUsuario(email, password, function(test){

            expect(test.success).toBe('true')
            done()
        })
    })
    it('Borrar usuario', function(done) {

        crudPromesas.eliminarUsuario(email, function(test){

            expect(test.success).toBe('true')
            done()
        })
    })
})


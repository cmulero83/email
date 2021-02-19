const parse = require('csv-parse')          // Sirve para parsear los .csv
const { request } = require('express')
const fs = require('fs')            // Permite leer los archivos del disco
const { on } = require('process')
const { PassThrough } = require('stream')


const csvData = []          // Aqui meteremos cada liena del .csv

fs.createReadStream(__dirname + '/test.csv')
    .pipe(
        parse({ delimiter: ';'})
    )
    .on('data', function(dataRow) {
        csvData.push(dataRow)
    })
    .on('end', function() {
        console.log(csvData);
        console.log(csvData[0][1]);
        console.log(csvData[1][0]);
        console.log(csvData.length);
    })
    
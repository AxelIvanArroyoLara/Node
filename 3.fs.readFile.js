const fs = require('node:fs')
const {promisify} = require('node:util')

const readFilePromise = promisify(fs.readFile) // Convierte callback a promesa

console.log("Leyendo primer archivo:")
fs.readFile('./archivo_1.txt', 'utf-8').then(textAsync1 => {
    console.log('Primer texto', textAsync1)
}) 


console.log("Leyendo segundo archivo:")
fs.readFile('./archivo_2.txt', 'utf-8').then(textAsync2 => {
    console.log('Primer texto', textAsync2)
}) 

// Esto permite usar promises en lugar de callbacks

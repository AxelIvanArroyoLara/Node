const { readFile } = require('node:fs/promises')

Promise.all([
    readFile('./archivo_1.txt', 'utf-8'),
    readFile('./archivo_2.txt', 'utf-8')
]).then(([text1, text2]) => {
    console.log('Primer texto:', text1)
    console.log('Segundo texto:', text2)
})

// Se logra asincronía mediante init

// Esto es asíncrono paralelo

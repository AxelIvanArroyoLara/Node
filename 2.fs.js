const fs = require('node:fs')

console.log("Leyendo primer archivo:")

const text1 = fs.readFileSync('./archivo_1.txt', 'utf-8')

console.log(text1)


console.log("Hacer cosas mientras se lee el archivo")

console.log("Leyendo segundo archivo:")

const text2 = fs.readFileSync('./archivo_2.txt', 'utf-8')

console.log(text2)

// Esto ha sido secuencial, pero se podría haber manejado de manera asíncrona:

console.log("Leyendo primer archivo:")
fs.readFile('./archivo_1.txt', 'utf-8', (err, textAsync) => { //callback
    console.log(textAsync)
})

console.log("Hacer cosas mientras se lee el archivo")
console.log("Leyendo segundo archivo:")
fs.readFile('./archivo_2.txt', 'utf-8', (err, textAsync2) => { //callback
    console.log(textAsync2)
})

// Node no es un entorno síncrono por defecto

// La asincronía no permite conocer en qué orden llegarán los resultados. Para esto se usa callback.

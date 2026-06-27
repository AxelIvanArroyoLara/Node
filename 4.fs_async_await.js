const { readFile } = require('node:fs/promises')

// IIFE - Inmediately Invoked Function Expression
;(
    async() => {
        console.log("Leyendo primer archivo:")
        const text1 = await readFile('./archivo_1.txt', 'utf-8')
        console.log(text1)

        console.log("Hacer cosas mientras se lee el archivo")

        console.log("Leyendo segundo archivo:")
        const text2 = await readFile('./archivo_2.txt', 'utf-8')
        console.log(text2)
    }
)()

// Se logra asincronía mediante una función autollamada

// Esto asíncrono secuencial

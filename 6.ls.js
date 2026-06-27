// Lectura de archivos

const fs = require('node:fs')

fs.readdir('.', (err, files) => {
    if (err){
        console.error("Error al leer ", err);
        return
    } else {
        files.forEach(file => {
            console.log(file)
        })
    }
})
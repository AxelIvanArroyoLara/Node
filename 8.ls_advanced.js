// Importamos el módulo "fs/promises" de Node.js.
// "fs" significa File System, o sea, sistema de archivos.
// La versión "promises" nos permite usar async/await en lugar de callbacks.
const fs = require('node:fs/promises')

// Importamos el módulo "path" de Node.js.
// Sirve para trabajar con rutas de archivos de forma segura.
// Por ejemplo, unir carpetas y nombres de archivos sin preocuparnos por "/" o "\".
const path = require('node:path')


const pc = require('picocolors')

// process.argv contiene los argumentos que pasamos por consola.
//
// Ejemplo:
// node ls.js carpeta
//
// process.argv sería algo como:
// [
//   'ruta/a/node',
//   'ruta/a/ls.js',
//   'carpeta'
// ]
//
// Por eso process.argv[2] es el primer argumento real que escribe el usuario.
//
// Si el usuario no pasa ningún argumento, usamos ".".
// En rutas, "." significa "la carpeta actual".
const folder = process.argv[2] ?? '.'

// Creamos una función async porque vamos a usar "await" dentro.
// "await" sirve para esperar operaciones asíncronas,
// como leer archivos o carpetas.
async function ls(folder) {
    // Declaramos la variable files afuera del try,
    // porque queremos usarla después del bloque try/catch.
    let files

    try {
        // fs.readdir(folder) lee el contenido de una carpeta.
        // Devuelve un arreglo con los nombres de archivos/carpetas dentro.
        //
        // Ejemplo:
        // ['index.js', 'package.json', 'src']
        //
        // Como es una operación asíncrona, usamos await.
        files = await fs.readdir(folder)
    } catch (error) {
        // Si ocurre un error al leer la carpeta,
        // mostramos un mensaje en consola.
        //
        // Usamos backticks `...` porque queremos insertar
        // el valor de la variable folder dentro del texto.
        console.error(`No se ha podido leer el directorio ${folder}`)

        // Terminamos el programa con código 1.
        // Código 0 normalmente significa "todo salió bien".
        // Código 1 significa "hubo un error".
        process.exit(1)
    }

    // files es un arreglo con nombres.
    //
    // Usamos map para convertir cada archivo en una promesa.
    // Cada promesa va a obtener información del archivo:
    // si es carpeta, tamaño, fecha de modificación, etc.
    //
    // Como la función dentro de map es async,
    // filesPromise será un arreglo de promesas.
    const filesPromise = files.map(async file => {
        // Construimos la ruta completa del archivo.
        //
        // Si folder = "src"
        // y file = "index.js"
        //
        // path.join(folder, file) produce:
        // "src/index.js"
        //
        // En Windows puede producir:
        // "src\index.js"
        //
        // Por eso usamos path.join y no concatenamos strings manualmente.
        const filePath = path.join(folder, file)

        // Declaramos fileStats afuera del try.
        // Esto es importante porque luego lo vamos a usar fuera del try.
        let fileStats

        try {
            // fs.stat(filePath) obtiene información del archivo o carpeta.
            //
            // Devuelve un objeto con datos como:
            // - tamaño
            // - fecha de modificación
            // - si es archivo
            // - si es carpeta
            //
            // NO usamos "const fileStats" aquí,
            // porque eso crearía otra variable solo dentro del try.
            //
            // Queremos asignar valor a la variable que declaramos arriba.
            fileStats = await fs.stat(filePath)
        } catch (error) {
            // Si no podemos leer la información del archivo,
            // mostramos el error.
            console.error(pc.red("Error"), error)

            // Terminamos el programa porque algo salió mal.
            process.exit(1)
        }

        // isDirectory() devuelve true si la ruta es una carpeta.
        // Devuelve false si es un archivo normal.
        const isDirectory = fileStats.isDirectory()

        // Si es carpeta, mostramos "d".
        // Si no es carpeta, mostramos "-".
        //
        // Esto imita un poco el estilo del comando "ls -l".
        const fileType = isDirectory ? 'd' : '-'

        // fileStats.size contiene el tamaño del archivo en bytes.
        const fileSize = fileStats.size

        // fileStats.mtime contiene la fecha de última modificación.
        //
        // toLocaleString() convierte la fecha a un formato más legible
        // según la configuración local de tu sistema.
        const fileModified = fileStats.mtime.toLocaleString()

        // Devolvemos un string con la información del archivo.
        //
        // Usamos backticks `...` para poder insertar variables con ${}.
        //
        // OJO:
        // fileType y fileSize tienen mayúsculas.
        // En JavaScript, fileType y filetype NO son lo mismo.
        return pc.yellow(`${fileType} ${file.padEnd(20)} ${fileSize.toString().padStart(10)} ${fileModified}`)
    })

    // filesPromise es un arreglo de promesas.
    //
    // Promise.all espera a que todas las promesas terminen.
    //
    // Cuando todas terminan, nos devuelve un arreglo con los resultados.
    const filesInfo = await Promise.all(filesPromise)

    // Recorremos cada línea de información y la imprimimos.
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

// Ejecutamos la función principal.
// Le pasamos la carpeta que vino desde la terminal,
// o "." si el usuario no pasó ninguna.
ls(folder)
// node --watch ./api/1.http.js para actualizar automáticamente (se puede usar nodemon pero SOLO COMO dev)

const { channel } = require('node:diagnostics_channel')
const http = require('node:http')
const fs = require('node:fs')

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

// Usa callbacks (ejecuta después de recibir la petición)
const processRequest = (req, res) => {
    console.log('request recieved: ', req.url)

    if (req.url === '/') {
        res.statusCode = 200 // OK
        res.setHeader('Content-Type', 'text/html', 'charset=utf-8') // Gracias a este header podemos usar acentos y al estar en html, devuelve como documento html en el navegador
        res.end('<h1>Bienvenido a la página de inicio</h1>')
    } else if (req.url === '/imagen-random.png'){
        res.setHeader('Content-Type', 'image/png')
        fs.readFile('./imagen.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 internal error</h1>')
            } else {
                // status code se pone por defecto
                res.setHeader('Content-Type', 'image/png') // Recupera la imagen binaria del buffer y la transforma
                res.end(data)
            }
        })
    } 
    
    else if (req.url === '/contacto') {
        res.statusCode = 200 // Se pone por defecto si la página funciona
        res.setHeader('Content-Type', 'text/plain', 'charset=utf-8')
        res.end('<h1>Contacto</h1>')
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain', 'charset=utf-8')
        res.end('<h1>404</h1>')
    }
}

// Esto antes incluía la request y el procesamiento de arriba, pero pasa como
// parámetro.
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})
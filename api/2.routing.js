const http = require('node:http')

// Importa json con commonJS
const dittoJson = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const { method, url } = req
    
    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJson))
                    break;
                default: 
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>404</h1>')
            }
            break;
    
        case 'POST':
            switch (url) {
                case '/pokemon':
                    { let body = '' // La llave previene que choque con unaconstante llamada igual
                    
                    // Escucha el evento data
                    req.on('data', chunk => {
                        body += chunk.toString()
                        // Se recibe la información por chunks
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)
                        // por ejemplo, guardar en bd
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8'})
                        res.end(JSON.stringify(data))
                    })
                    break
                }
                default: 
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
                break
        }
    }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listening on port 3000')
})
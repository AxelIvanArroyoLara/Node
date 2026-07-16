// Express es de producción
const ditto = require('./pokemon/ditto.json')

const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

// Cuando la app recibe un get en esta ruta, ejecuta acciones
app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi página</h1>') // Detecta ContentType automáticamente
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = '' // La llave previene que choque con una constante llamada igual

  // Escucha el evento data
  req.on('data', chunk => {
    body += chunk.toString()
    // Se recibe la información por chunks
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    //res.end(JSON.stringify(data)) se sustituye
    res.status(201).json(data)
  })
})

app.listen(PORT, () => {
  console.log('server listening on 3000')
})

// La última a la que va a llegar (use se usa para todas las requests)
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})
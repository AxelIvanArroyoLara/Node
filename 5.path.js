// path une sistema de rutas entre sistemas operativos

const path = require('node:path')

// barra separadora de carpetas según OS
console.log(path.sep)

// unir rutas con path.join

// Asúmase ruta (content/subfolder/test.txt)
const filePath = path.join('./content', 'subfolder', 'test.txt')
console.log(filePath)

// Recupera el nombre del archivo en esta ruta
const base = path.basename('/tmp/elher-files/password.txt')
console.log(base)
// Se recupera solo el nombre sin la extensión
const filename = path.basename('/tmp/elher-files/password.txt', '.txt')
console.log(filename)
// Se recupera solo la extensión
const extension = path.extname('image.jpg')
console.log(extension)


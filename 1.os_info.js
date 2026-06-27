// RECUERDA CREAR NPM INIT -y

const os = require('node:os')

console.log('Os platform:' + os.platform())

console.log('Os CPU' + os.cpus())

console.log('Os uptime' + os.uptime()/60/60)
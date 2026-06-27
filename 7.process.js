// El objeto process proporciona información acerca del proceso actual en ejecución

// Argumentos de entrada
console.log(process.argv)

// Controlar el proceso y su salida
process.exit(1)

// Controlar eventos del proceso
process.on('exit', ()=>{
    // Limpiar recursos
})

// Current working directory indica desde qué directorio se está ejecutando algo
console.log(process.cwd())

//platform
console.log(process.env.ALGO)
const yargs =  require('yargs');
const { hideBin } =  require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .command("crear", 'Crea una nueva tarea en la lista',
        {
            titulo: {
                describe: 'El título de la nueva tarea',
                demandOption: true,
                type: 'string',
                alias: 't'
            },
            descripcion: {
                describe: 'La descripción de la tarea',
                demandOption: false,
                type: 'string',
                alias: 'd'
            }
        }, (argv) => {
            // El handler es la función que se ejecuta cuando el comando es llamado.
            // 'argv' es un objeto ya parseado con todas las opciones.
            try{
                console.log('--- Creando una nueva tarea ---');
                console.log(`Título: ${argv.titulo}`);
                if (argv.descripcion) {
                    console.log(`Descripción: ${argv.descripcion}`);
                }            
                // Aquí iría la lógica para guardar la tarea en un archivo o base de datos.
            }catch (e){
                console.error(e)
            }

    }).argv;

    

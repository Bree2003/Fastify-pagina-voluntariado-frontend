// CON ESTO REEMPLAZAMOS GLITCH

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
fastify.register(require('@fastify/cors'), {}); /* para que no salga el bloqueo de CORS */

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// ejemplo de otra ruta
fastify.post('/registro', require('./src/registro'));
fastify.post('/login', require('./src/login'));
fastify.post('/usuario/checktoken', require('./src/checktoken'));

/* fastify.post('/registro', async (request, reply) => {
    
    //   GET -> recuperar lo que mandamos en js
    const datosGET = request.query;
    //   POST y otros métodos
    const datosPOST = request.body;
    
    const datos = request.body;
    return { datos };
}) */

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
const { admin } = require('./firebase');

module.exports = async (request, response) => {
    try {
        const headerAutorizacion = request.headers.authorization; /* [0]Bearer [1]fdjkfdsoisnfjkdlyrj */
        console.dir(headerAutorizacion);
        const bearer = headerAutorizacion.split(' ');
        const token = bearer[1];
        console.log(token);
        const usuario = await admin.auth().verifyIdToken(token);
        console.dir(usuario);
        return { token: 'válido' };
    } catch (error) {
        response.code(401).send({ token: 'inválido', error: error.message });
    }
};
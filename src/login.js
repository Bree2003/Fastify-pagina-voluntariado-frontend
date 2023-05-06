const { app } = require('./firebase');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

module.exports = async (request, response) => {
    const { email, contrasena } = request.body;

    try {
        const usuario = await signInWithEmailAndPassword(getAuth(), email, contrasena);
        // en el caso exitoso
        return { usuario };
    } catch (error) {
        // gestión errores
        switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return response.code(401).send({
                    codigo: error.code,
                    mensaje: error.message
                });
            default:
                response.code(500).send({
                    codigo: error.code,
                    mensaje: error.message
                });
        }
    }

};
const { admin } = require('./firebase'); /* el .js es opcional */

module.exports = async (request, response) => {

    /* // opción 1
    const email = request.body.email;
    const contrasena = request.body.password; */

    // opción 2 destructuración
    const { email, contrasena } = request.body;

    try {
        const usuario = await admin.auth().createUser({
            email: email,
            password: contrasena
        });
        return usuario;
    } catch (error) {
        response.code(500).send({ error: 'Ocurrió un error al crear el usuario.' });
    }
};
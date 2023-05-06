const { admin } = require('./firebase');

module.exports = async (request, response) => {
    switch (request.method) {
        case 'GET':
            return procesarGET(request, response);
        case 'POST':
            return procesarPOST(request, response);
        case 'PUT':
            return procesarPUT(request, response);
        case 'DELETE':
            return procesarDELETE(request, response);
        default:
            response.code(500).send({ error: 'Método HTTP no soportado!' });
    }
};

function getColeccion() {
    return admin.firestore().collection('categorias'); /* creando colección desde el código */
}

async function procesarGET(request, response) {
    return { m: 'GET' }
}
async function procesarPOST(request, response) {
    try {
        const { nombre, descripcion } = request.body; /* objeto destructurado */
        const categoria = {
            nombre,
            descripcion
        }
        const documento = await getColeccion().doc(); /* crea documento vacío y autogenera id */
        const id = documento.id;
        documento.set(categoria);
        categoria.id = id;
        return categoria;
    } catch (error) {
        response.code(500).send({ error: error.message });
    }


}
async function procesarPUT(request, response) {
    return { m: 'PUT' }
}
async function procesarDELETE(request, response) {
    return { m: 'DELETE' }
}
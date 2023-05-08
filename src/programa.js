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

function getPrograma() {
    return admin.firestore().collection('programas'); /* creando colección desde el código */
}

async function procesarGET(request, response) {
    try {
        const querySnapshot = await getPrograma().get();
        const documentos = querySnapshot.docs.map(datos => { /* array con los datos de cada uno de los objetos (iteración) */
            return datos.data();
            /* return {
            id: datos.id,
            ...datos.data()
            } */
        });
        return documentos;
    } catch (error) {
        response.code(500).send({ error: error.message });
    }
}
async function procesarPOST(request, response) {
    try {
        const { nombre, descripcion } = request.body; /* objeto destructurado */
        const programa = {
            nombre,
            descripcion
        }
        const documento = await getPrograma().doc(); /* crea documento vacío y autogenera id */
        const id = documento.id;
        documento.set(programa);
        programa.id = id;
        return programa;
    } catch (error) {
        response.code(500).send({ error: error.message });
    }


}
async function procesarPUT(request, response) {
    try {
        const { nombre, descripcion, id } = request.body;
        const programa = {
            nombre,
            descripcion
        }
        const documento = await getPrograma().doc(id); // crea documento vacío         
        documento.update(programa);
        return programa;
    } catch (error) {
        res.code(500).send({ error: error.message });
    }
}
async function procesarDELETE(request, response) {
    try {
        const id = request.query.id; /* http://localhost:3000/programa?id=XXXXXXXXXXXX */
        const docRef = await getPrograma().doc(id);
        await docRef.delete();
        return { borrado: true };
    } catch (error) {
        return { borrado: false, mensaje: error.message };
    }

}
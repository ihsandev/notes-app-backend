const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNewNotes = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newPyload = {
        id, title, tags, body, createdAt, updatedAt,
    };

    notes.push(newPyload);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotes = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteById = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateNoteById = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;

    const index = notes.findIndex((n) => n.id === id);
    const updatedAt = new Date().toISOString();

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Berhasil mengubah catatan',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal mengubah catatan',
    });

    response.code(404);
    return response;
};

const deleteNoteById = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((n) => n.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Berhasil menghapus catatan',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal mengubah catatan',
    });

    response.code(404);
    return response;
};

module.exports = {
    addNewNotes, getAllNotes, getNoteById, updateNoteById, deleteNoteById,
};

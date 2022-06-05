const { response } = require("@hapi/hapi/lib/validation");
const { nanoid } = require("nanoid");
const notes = require("./notes");

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNotesByIdHandler = (request, header) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const res = header.response({
    status: "fail",
    message: "Notes tidak ditemukan",
  });

  res.code(404);
  return res;
};

const editNoteById = (request, header) => {
  const { id } = request.params;

  const idx = notes.findIndex((note) => note.id === id);

  const { title, tags, body } = request.payload;

  if (!title) {
    const res = header.response({
      status: "fail",
      message: "Notes gagal diperbarui",
    });

    res.code(400);
    return res;
  }

  if (idx !== -1) {
    notes[idx] = {
      ...notes[idx],
      title,
      tags,
      body,
    };

    const res = header.response({
      status: "Success",
      message: "Notes berhasil diperbarui",
    });

    res.code(200);
    return res;
  }
};

const deleteNoteById = (req, h) => {
  const { id } = req.params;
  const idx = notes.findIndex((note) => note.id === id);

  if (idx !== -1) {
    notes.splice(idx, 1);
    const res = h.response({
      status: "Success",
      message: "Notes berhasil dihapus",
    });

    res.code(200);
    return res;
  }

  const res = header.response({
    status: "Fail",
    message: "Notes tidak berhasil dihapus, id tidak ditemukan",
  });

  res.code(400);
  return res;
};

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });

  response.code(500);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteById,
  deleteNoteById,
};

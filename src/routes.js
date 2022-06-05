const {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteById,
  deleteNoteById,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNotesByIdHandler,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteById,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteById,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
];

module.exports = routes;

const { addNoteHandler, getAllNotesHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },
    {
        method: 'POST',
        path: '/notes',
        handler: getAllNotesHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    }
];

module.exports = routes;
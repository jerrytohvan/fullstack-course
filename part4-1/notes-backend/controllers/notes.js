const notesRouter = require('express').Router();
const { createDbConnection } = require('../utils/dbClient');
const Note = require('../models/note');
const mongoose = require('mongoose');

notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get('/:id', async (request, response, next) => {
  await createDbConnection();

  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;
  await createDbConnection();
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

notesRouter.delete('/:id', async (request, response, next) => {
  await createDbConnection();

  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

notesRouter.put('/:id', async (request, response, next) => {
  await createDbConnection();

  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

module.exports = notesRouter;

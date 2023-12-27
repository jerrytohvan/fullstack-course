const notesRouter = require('express').Router();
const { createDbConnection } = require('../utils/dbClient');
const Note = require('../models/note');
const mongoose = require('mongoose');

notesRouter.get('/', async (request, response) => {
  await createDbConnection();
  const notes = await Note.find({})
    .finally(() => mongoose.connection.close());
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  await createDbConnection();
  const note = await Note.findById(request.params.id).finally(() =>
    mongoose.connection.close()
  );
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;
  await createDbConnection();
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note
    .save()
    .finally(() => mongoose.connection.close());
  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  await createDbConnection();
  await Note.findByIdAndDelete(request.params.id).finally(() => {
    mongoose.connection.close();
  });
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
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
    .finally(() => {
      mongoose.connection.close();
    });
});

module.exports = notesRouter;

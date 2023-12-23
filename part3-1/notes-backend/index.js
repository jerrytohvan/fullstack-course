const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const { createDbConnection } = require("./models/client.js");
const { Note } = require("./models/note.js");

app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", async (request, response) => {
  await createDbConnection();
  return Note.find({})
    .then((notes) => {
      console.log("notes", notes);
      response.json(notes);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});

app.put("/api/notes/:id", async (request, response, next) => {
  await createDbConnection();
  const { content, important } = request.body;

  const note = {
    content,
    important
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

app.get("/api/notes/:id", async (request, response, next) => {
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

app.delete("/api/notes/:id", async (request, response, next) => {
  await createDbConnection();
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

app.post("/api/notes", async (request, response, next) => {
  await createDbConnection();
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important || false,
  };

  const addedNotes = new Note(note);
  addedNotes
    .save()
    .then((result) => {
      response.json(note);
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

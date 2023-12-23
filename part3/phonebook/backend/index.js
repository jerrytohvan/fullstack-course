const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

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

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req) => {
  if (req.method === "POST") return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const { createDbConnection } = require("./models/client.js");
const { Person } = require("./models/person.js");
const { default: mongoose } = require("mongoose");

const getAllPersons = async () => {
  await createDbConnection();
  return Person.find({})
    .then((result) => result)
    .finally(() => mongoose.connection.close());
};

const validateInput = async (data) => {
  if (data) {
    if (!data.name || !data.number) {
      return {
        error: "content missing",
      };
    }
    await createDbConnection();
    const fetchExistingPerson = await Person.findOne({ name: data.name })
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => mongoose.connection.close());
    if (fetchExistingPerson) {
      return {
        error: "name must be unique",
      };
    }
  }
  return null;
};

app.get("/api/persons", async (request, response) => {
  return response.json(await getAllPersons());
});

app.get("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  await createDbConnection();

  Person.findById(id)
    .then((result) => response.json(result))
    .catch((error) => next(error))
    .finally(() => mongoose.connection.close());
});

app.get("/info", async (request, response) => {
  const dateNow = new Date();
  const fetchedPersons = await getAllPersons();
  const displayData = `<p>Phonebook has info for ${
    fetchedPerson.length
  } people</p>${dateNow.toString()}`;
  response.send(displayData);
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  await createDbConnection();
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error))
    .finally(() => mongoose.connection.close());
});

app.put("/api/persons/:id", async (request, response, next) => {
  await createDbConnection();
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number || false,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error))
    .finally(() => {
      mongoose.connection.close();
    });
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;

  const validateData = await validateInput(body);

  if (validateData) {
    return response.status(400).json(validateData);
  }

  const person = {
    name: body.name,
    number: body.number || false,
  };
  await createDbConnection();
  const contact = new Person(person);
  const addedContact = await contact
    .save()
    .then((result) => result)
    .catch((error) => next(error));

  response.json(addedContact);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//https://fullstackopen.com/osa3/validointi_ja_es_lint#tehtavat-3-19-3-21

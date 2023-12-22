const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
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
const { Phonebook } = require("./models/phonebook.js");
const { default: mongoose } = require("mongoose");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getAllPersons = async () => {
  await createDbConnection();
  return Phonebook.find({})
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
    const fetchExistingPhonebook = await Phonebook.findOne({ name: data.name })
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => mongoose.connection.close());
    if (fetchExistingPhonebook) {
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

app.get("/api/persons/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await createDbConnection();
    const fetchedPhonebook = await Phonebook.findOne({ _id: id })
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => mongoose.connection.close());
    if (fetchedPhonebook) {
      response.json(fetchedPhonebook);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Something wrong happened: ${error.message}` });
  }
});

app.get("/info", async (request, response) => {
  const dateNow = new Date();
  const fetchedPhonebooks = await getAllPersons();
  const displayData = `<p>Phonebook has info for ${
    fetchedPhonebooks.length
  } people</p>${dateNow.toString()}`;
  response.send(displayData);
});

app.delete("/api/persons/:id", async (request, response) => {
  const id = request.params.id;
  await createDbConnection();

  try {
    const fetchedPhonebook = await Phonebook.findOne({ _id: id })
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
    if (fetchedPhonebook) {
      await Phonebook.deleteOne({ _id: fetchedPhonebook._id }).then(
        (result) => {
          mongoose.connection.close();
          response.status(204).end();
        }
      );
    } else {
      mongoose.connection.close();
      response.status(404).end();
    }
  } catch (error) {
    mongoose.connection.close();
    return response
      .status(500)
      .json({ error: `Something wrong happened: ${error.message}` });
  }
});

app.post("/api/persons", async (request, response) => {
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
  const contact = new Phonebook(person);
  const addedContact = await contact
    .save()
    .then((result) => result)
    .catch((error) =>
      response
        .status(500)
        .json({ error: `Something wrong happened: ${error.message}` })
    );

  response.json(addedContact);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

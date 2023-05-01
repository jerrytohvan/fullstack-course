const express = require("express");
const app = express();

app.use(express.json());

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

const validateInput = (data) => {
  if (!data.name || !data.number) {
    return {
      error: "content missing",
    };
  }

  const personExist = persons.find((person) => person.name === data.name);
  if (personExist) {
    return {
      error: "name must be unique",
    };
  }
  return null;
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const dateNow = new Date();
  const displayData = `<p>Phonebook has info for ${
    persons.length
  } people</p><br/>${dateNow.toString()}`;
  response.send(displayData);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  console.log(request.body);
  const body = request.body;

  const validateData = validateInput(body);

  if(validateData){
    return response.status(400).json(validateData);
  }

  const person = {
    name: body.name,
    number: body.number || false,
    id: Math.floor(Math.random() * 10000001),
  };

  persons = persons.concat(person);

  response.json(person);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

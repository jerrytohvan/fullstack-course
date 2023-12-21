const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://jerrytohvan:${password}@fullstack-course.o2kvfuo.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (!name || !number) {
  Phonebook.find({}).then((phonebook) => {
    console.log("phonebook");
    phonebook.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const phonebook = new Phonebook({
    name,
    number,
  });

  const newNumber = phonebook.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
    return result;
  });
}

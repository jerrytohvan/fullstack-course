const mongoose = require("mongoose");
require('dotenv').config();

const DATABASE_PASS = process.env.DATABASE_PASS;
const url = `mongodb+srv://jerrytohvan:${DATABASE_PASS}@fullstack-course.o2kvfuo.mongodb.net/?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
  return mongoose.model("Note", noteSchema);
};


module.exports = { Note };

// https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan

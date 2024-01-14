const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = encodeURI(
  `mongodb+srv://jerrytohvan:${password}@fullstack-course.o2kvfuo.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

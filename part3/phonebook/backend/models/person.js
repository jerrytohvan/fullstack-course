const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d{2,3})-\d{6,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minlength: 8,
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = { Person };

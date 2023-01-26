let mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "you must pass a name"],
    trim: true,
    maxlength: [20, "the text must has less that 20 character"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
// the model is like a document with json files
module.exports = mongoose.model("task", taskSchema);

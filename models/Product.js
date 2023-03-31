const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  completed: { type: Boolean, default: false },
});

module.exports = model("Task", taskSchema);

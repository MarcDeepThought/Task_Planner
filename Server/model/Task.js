// File for defining a Task object.

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
    // description: String,
    // assignee: String
});

// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. 
module.exports = mongoose.model("Task", TaskSchema);
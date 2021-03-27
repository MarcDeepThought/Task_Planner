const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");


// Connect to DB.
// DB: taskplannerDB
// collection: tasks
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.DB_CONNECTION)
    .then( () => console.log("connected to DB."))
    .catch( err => console.log(err));


// Import Routes
const tasksRoute = require("./routes/tasks");


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", tasksRoute);


// Start listening to a particular port.
app.listen(3000);


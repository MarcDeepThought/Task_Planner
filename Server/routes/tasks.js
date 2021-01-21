/**
 * File containing all the logic of the /tasks endpoint.
 */
const express = require("express");

const router = express.Router();

const Task = require("../model/Task");


// Get all tasks from the DB.
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        res.status(500).json({message: err});
    }
});


// Inserting a task into the DB.
router.post("/", (req, res) => {
    console.log(req.body);
    const task = new Task({
        title: req.body.title
    });
    task.save()
    .then(data => {
        console.log("Inserting task.");
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err});
    });
});


// Deleting a task from the DB
router.delete("/", (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    task.delete()
    .then(data => {
        console.log("Deleting task.");
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err});
    });
});


// Updating a task in the DB.
router.put("/", (req, res) => {
    console.log(req.body);
    Task.updateOne(req.body)
    .then(data => {
        console.log("Updating task.");
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err});
    });
});


// Get specific task by id.
router.get("/byId/:taskId", async (req,res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        res.status(200).json(task);
    } catch(err) {
        res.status(500).json({message: err});
    }
});


module.exports = router;
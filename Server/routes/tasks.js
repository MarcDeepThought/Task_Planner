/**
 * File containing all the logic of the /tasks endpoint.
 */
const express = require("express");

const router = express.Router();

const Task = require("../model/Task");
var ObjectID = require("mongodb").ObjectID;

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
    const task = new Task({
        title: req.body.title,
        status: req.body.status
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
    Task.deleteOne({"_id": req.body.id})
    .then(data => {
        console.log("Deleting task.");
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err});
    });
});


// Updating a task in the DB. First find the Task, then change the attributes accordingly and then update the task in the DB.
router.put("/", async (req, res) => {
    try {
        const filter = { "_id": ObjectID(req.body.id) };
        const options = { upsert: true };
        let task = {
            "title": req.body.title,
            "status": req.body.status
        };
        await Task.updateOne(filter, {$set: task});
        res.status(200);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: err});
    }
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
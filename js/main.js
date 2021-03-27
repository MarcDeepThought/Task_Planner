
class Task {
    constructor(id, title, status) {
        this.id = id;
        this.title = title;
        this.status = status;
    }
}


// Code for the SVG graphics remove/complete:
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// Variable holding all open tasks and all completed tasks in arrays.
let tasks = {
    openTasks: [],
    completedTasks: []
}
fetchAllTasksfromDB();

// Add tasks to the DOM.
renderTaskList();

// Adding an EventListener to the add button in the header.
document.getElementById("add").addEventListener("click", function() {
    let taskDescription = document.getElementById("taskDescription").value;
    if (taskDescription) {
        addTask(taskDescription);
    }
});

// Adding an EventListener to the add button in the header, which triggers the adding of a task, when the "Enter" key is pressed.
document.getElementById("taskDescription").addEventListener("keydown", function(e) {
    let value = this.value;
    console.log(e.code);
    if (e.code === "Enter" && value) {
        addTask(value)
    }
});

/*
*   Function for adding the open and completed tasks tto the DOM (to the list objects).
*/
function renderTaskList() {
    if (!tasks.openTasks.length && !tasks.completedTasks.length) {
        console.log("no tasks");
        return;
    }

    for (var i = 0; i < tasks.openTasks.length; i++) {
        let task = tasks.openTasks[i];
        console.log("adding open tasks");
        addTaskToDOM(task.title, false, task.id);
    }

    for (var j = 0; j < tasks.completedTasks.length; j++) {
        let task = tasks.completedTasks[j];
        console.log("adding completed tasks");
        addTaskToDOM(task.title, true, task.id);
    }
}

/*
*   Function for removing a task after the delete button has been clicked.
*/
function removeTask() {
    let taskLi = this.parentNode.parentNode;
    let parent = taskLi.parentNode;
    let listId = parent.id
    let taskId = taskLi.id;
    let task;

    if (listId === "openTasks") {
        task = findOpenTaskById(taskId);
        tasks.openTasks.splice(tasks.openTasks.indexOf(taskId), 1);
    } else {
        task = findCompletedTaskById(taskId);
        tasks.completedTasks.splice(tasks.completedTasks.indexOf(taskId), 1);
    }

    deleteTaskInDB(taskId);

    // Remove the ListItem from the DOM.
    parent.removeChild(taskLi);
}

/*
*   Function for toggeling the completion of a task, when the complete button is clicked.
*   An open task is set to completed.
*   A completed task is set to open.
*/
function completeTask() {
    console.log("completing a task");
    let taskLi = this.parentNode.parentNode;
    let parent = taskLi.parentNode;
    let listId = parent.id
    let taskId = taskLi.id;
    let task;
    if (listId === "openTasks") {
        task = findOpenTaskById(taskId);
        task.status = "completed";
        tasks.openTasks.splice(tasks.openTasks.indexOf(taskId), 1);
        tasks.completedTasks.push(task);
    } else {
        task = findCompletedTaskById(taskId);
        task.status = "open";
        tasks.completedTasks.splice(tasks.completedTasks.indexOf(taskId), 1);
        tasks.openTasks.push(task);
    }
    updateTaskInDB(task);

    parent.removeChild(taskLi);
    let listToAdd = (listId === "completedTasks") ?
            document.getElementById("openTasks") :
            document.getElementById("completedTasks");
    
    listToAdd.insertBefore(taskLi, listToAdd.childNodes[0]);
}

/*
*   Function for adding a task to the DOM.
*   The parameter "completed" determines, whether the task is added to the open tasks oder to the completed tasks.
*/
function addTaskToDOM(text, completed, taskId) {
    let list = (completed) ? document.getElementById("completedTasks") : 
        document.getElementById("openTasks");

    let task = document.createElement("li");
    task.innerText = text;
    task.id = taskId;

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerHTML = removeSVG;
    removeButton.addEventListener("click", removeTask);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = completeSVG;
    completeButton.addEventListener("click", completeTask);

    buttons.appendChild(removeButton);
    buttons.appendChild(completeButton);
    task.appendChild(buttons);
    //list.appendChild(task); // add the task at the bottom

    // insert new task at the top of the list
    list.insertBefore(task, list.childNodes[0]);
}

/*
* Function for adding a task. The task is added to the global variable, to the DOM and to the localStorage.
* @param {*} taskDescription 
*/
function addTask(taskDescription) {
    let taskId = saveTaskInDB(taskDescription);
    addTaskToDOM(taskDescription, false, taskId);
    document.getElementById("taskDescription").value = '';

    tasks.openTasks.push(taskDescription);
}

/**
 *  Function returning an open task with given id.
 * @param {*} taskId 
 */ 
function findOpenTaskById(taskId) {
    return tasks.openTasks.find(task => {
        return task.id === taskId
    });
}

/**
 * Function returning a completed task with given id.
 * @param {*} taskId 
 */
function findCompletedTaskById(taskId) {
    return tasks.completedTasks.find(task => {
        return task.id === taskId
    });
}

/*
*   Function for fetching all tasks from the database.
*/
async function fetchAllTasksfromDB() {
    console.log("fetching tasks from the DB");
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasksResponse = await response.json();
        console.log("inner fetch block");
        console.log(tasksResponse);
        tasksResponse.forEach(object => {
            let task = new Task(object._id, object.title, object.status);
            if (task.status === "completed") {
                tasks.completedTasks.push(task);
            } else {
                tasks.openTasks.push(task);
            };
        });
        console.log(tasks);
        renderTaskList();
        return tasksResponse;
    } catch(error) {
        console.log(error);
    }
}

/**
 * Function for saving a task in the database. After the task is save the corresponding id is retrieved.
 * @param {*} taskDescription 
 */
function saveTaskInDB(taskDescription) {
    let data = {"title": taskDescription, "status": "open"};
    fetch('http://localhost:3000/tasks', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data._id;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

/**
 * Function for updating a task in the database.
 * @param {*} task 
 */
function updateTaskInDB(task) {
    let data = {"id": task.id, "title": task.title, "status": task.status};
    console.log("updateTaskInDB:");
    console.log(data);
    fetch('http://localhost:3000/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

/**
 * Function for saving a task in the database. After the task is save the corresponding id is retrieved.
 * @param {*} taskId 
 */
function deleteTaskInDB(taskId) {
    let data = {"id": taskId};
    fetch('http://localhost:3000/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data._id;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
// Code for the SVG graphics remove/complete:
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// Variable holding all open tasks and all completed tasks in arrays.
let tasks = (localStorage.getItem("taskList")) ? JSON.parse(localStorage.getItem("taskList")) : {
    openTasks: [],
    completedTasks: []
}
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
*   Function for storing the task in the localStorage.
*/
function dataObjectUpdated() {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}

/*
*   Function for adding the open and completed tasks tto the DOM (to the list objects).
*/
function renderTaskList() {
    if (!tasks.openTasks.length && !tasks.completedTasks.length) return;

    for (var i = 0; i < tasks.openTasks.length; i++) {
        let task = tasks.openTasks[i];
        addTaskToDOM(task);
    }

    for (var j = 0; j < tasks.completedTasks.length; j++) {
        let task = tasks.completedTasks[j];
        addTaskToDOM(task, true);
    }
}

/*
*   Function for removing a task after the delete button has been clicked.
*/
function removeTask() {
    let task = this.parentNode.parentNode;
    let parent = task.parentNode;
    let id = parent.id
    let value = task.innerText;

    if (id === "openTasks") {
        tasks.openTasks.splice(tasks.openTasks.indexOf(value), 1);
    } else {
        tasks.completedTasks.splice(tasks.completedTasks.indexOf(value), 1);
    }

    dataObjectUpdated()

    parent.removeChild(task);
}

/*
*   Function for toggeling the completion of a task, when the complete button is clicked.
*   An open task is set to completed.
*   A completed task is set to open.
*/
function completeTask() {
    let task = this.parentNode.parentNode;
    let parent = task.parentNode;
    let id = parent.id
    let value = task.innerText;

    if (id === "openTasks") {
        tasks.openTasks.splice(tasks.openTasks.indexOf(value), 1);
        tasks.completedTasks.push(value);
    } else {
        tasks.completedTasks.splice(tasks.completedTasks.indexOf(value), 1);
        tasks.openTasks.push(value);
    }

    dataObjectUpdated()

    parent.removeChild(task);
    let listToAdd = (id === "completedTasks") ?
            document.getElementById("openTasks") :
            document.getElementById("completedTasks");
    
    listToAdd.insertBefore(task, listToAdd.childNodes[0]);
}

/*
*   Function for adding a task to the DOM.
*   The parameter "completed" determines, whether the task is added to the open tasks oder to the completed tasks.
*/
function addTaskToDOM(text, completed) {
    let list = (completed) ? document.getElementById("completedTasks") : document.getElementById("openTasks");

    let task = document.createElement("li");
    task.innerText = text;

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = removeSVG;
    remove.addEventListener("click", removeTask);

    let complete = document.createElement("button");
    complete.classList.add("complete");
    complete.innerHTML = completeSVG;
    complete.addEventListener("click", completeTask);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    task.appendChild(buttons);
    //list.appendChild(task); // add the task at the bottom

    // insert new task at the top of the list
    list.insertBefore(task, list.childNodes[0]);
}

/*
*   Function for adding a task. The task is added to the global variable, to the DOM and to the localStorage.
*/
function addTask(taskDescription) {
    addTaskToDOM(taskDescription);
    document.getElementById("taskDescription").value = '';

    tasks.openTasks.push(taskDescription);
    dataObjectUpdated();
}

// Local Storage key
const STORAGE_KEY = "todo_tasks";

// DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const tasksCount = document.getElementById("tasks-count");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

// In-memory tasks array
let tasks = [];

// ---------- Local Storage Helpers ----------
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        tasks = JSON.parse(data);
    } else {
        tasks = [];
    }
}

// ---------- DOM Rendering ----------
function updateTasksCount() {
    const count = tasks.length;
    tasksCount.textContent = count === 1 ? "1 task" : `${count} tasks`;
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");
    li.dataset.id = task.id;

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "task-btn edit";
    editBtn.textContent = "Edit";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "task-btn delete";
    deleteBtn.textContent = "Delete";

    // Append
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Event: toggle complete
    checkbox.addEventListener("change", () => {
        toggleTaskComplete(task.id);
    });

    // Event: edit
    editBtn.addEventListener("click", () => {
        editTask(task.id);
    });

    // Event: delete
    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id);
    });

    return li;
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
    updateTasksCount();
}

// ---------- Core Operations ----------

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    const newTask = {
        id: Date.now(), // unique id
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

// Toggle complete / incomplete
function toggleTaskComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Edit / update task text
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Update your task:", task.text);
    if (newText === null) return; // cancelled
    const trimmed = newText.trim();
    if (trimmed === "") {
        alert("Task cannot be empty!");
        return;
    }

    task.text = trimmed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Clear all completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// ---------- Event Listeners ----------
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// ---------- Init ----------
window.addEventListener("DOMContentLoaded", () => {
    loadTasks();   // load from localStorage
    renderTasks(); // show tasks
});

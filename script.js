// Select Elements
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);


addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});


function addTask() {
    let taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTasks();

    inputBox.value = "";
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = text;

    const btnBox = document.createElement("div");
    btnBox.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔";
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "✖";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    btnBox.appendChild(completeBtn);
    btnBox.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(btnBox);
    taskList.appendChild(li);
}


function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#task-list li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("todoList", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("todoList")) || [];

    savedTasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
    });
}

const TODO_KEY = "arvseTodoTasks";

function loadTasks() {
    return JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
}

function saveTasks(tasks) {
    localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    const tasks = loadTasks();

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-row";

        const label = document.createElement("label");
        label.className = "task-label";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
        });

        const title = document.createElement("span");
        title.textContent = task.text;
        if (task.completed) {
            title.classList.add("completed");
        }

        label.appendChild(checkbox);
        label.appendChild(title);
        li.appendChild(label);

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => {
            const remaining = loadTasks().filter((item) => item.id !== task.id);
            saveTasks(remaining);
            renderTasks();
        });
        li.appendChild(deletebtn);

        list.appendChild(li);
    });

    updateTaskSummary();
}

function updateTaskSummary() {
    const summary = document.getElementById("todoSummary");
    if (!summary) return;

    const tasks = loadTasks();
    const completed = tasks.filter((task) => task.completed).length;
    summary.textContent = `${completed} of ${tasks.length} tasks complete`;
}

function addTask() {
    const input = document.getElementById("task");
    const taskText = input.value.trim();
    if (!taskText) return;

    const tasks = loadTasks();
    tasks.push({
        id: Date.now().toString(),
        text: taskText,
        completed: false,
    });
    saveTasks(tasks);
    renderTasks();
    input.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});
const GOALS_KEY = "arvseGoals";

function loadGoals() {
    return JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
}

function saveGoals(goals) {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

function renderGoals() {
    const result = document.getElementById("result");
    result.innerHTML = "";
    const goals = loadGoals();

    goals.forEach((goal) => {
        const item = document.createElement("div");
        item.className = "goal-item";
        if (goal.completed) {
            item.classList.add("completed");
        }

        const goalText = document.createElement("div");
        goalText.className = "goal-text";

        const title = document.createElement("h3");
        title.textContent = goal.text;
        const category = document.createElement("p");
        category.textContent = goal.category;

        goalText.appendChild(title);
        goalText.appendChild(category);

        const actionRow = document.createElement("div");
        actionRow.className = "goal-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = goal.completed ? "✔️ Completed" : "Mark done";
        completeBtn.addEventListener("click", () => {
            goal.completed = !goal.completed;
            saveGoals(goals);
            renderGoals();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => {
            const remaining = loadGoals().filter((item) => item.id !== goal.id);
            saveGoals(remaining);
            renderGoals();
        });

        actionRow.appendChild(completeBtn);
        actionRow.appendChild(deleteBtn);
        item.appendChild(goalText);
        item.appendChild(actionRow);
        result.appendChild(item);
    });

    updateGoalSummary();
}

function updateGoalSummary() {
    const summary = document.getElementById("goalSummary");
    if (!summary) return;

    const goals = loadGoals();
    const completed = goals.filter((goal) => goal.completed).length;
    summary.textContent = `${completed} of ${goals.length} goals completed`;
}

function addGoal() {
    const goalText = document.getElementById("meaningful_goal").value.trim();
    const category = document.getElementById("goal").value;

    if (goalText === "") {
        alert("Please enter a goal");
        return;
    }

    const goals = loadGoals();
    goals.push({
        id: Date.now().toString(),
        text: goalText,
        category,
        completed: false,
    });
    saveGoals(goals);
    renderGoals();
    document.getElementById("meaningful_goal").value = "";
}

document.addEventListener("DOMContentLoaded", renderGoals);
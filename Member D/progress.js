document.addEventListener('DOMContentLoaded', () => {
    const goalsCompletedEl = document.getElementById('goalsCompleted');
    const goalsTotalEl = document.getElementById('goalsTotal');
    const tasksCompletedEl = document.getElementById('tasksCompleted');
    const tasksTotalEl = document.getElementById('tasksTotal');
    const sessionsCompletedEl = document.getElementById('sessionsCompleted');
    const sessionsTotalEl = document.getElementById('sessionsTotal');
    const overallSummary = document.getElementById('overallSummary');
    const overallFill = document.getElementById('overallFill');
    const goalsDetail = document.getElementById('goalsDetail');
    const tasksDetail = document.getElementById('tasksDetail');
    const sessionsDetail = document.getElementById('sessionsDetail');
    const summaryGoals = document.getElementById('summaryGoals');
    const summaryTasks = document.getElementById('summaryTasks');
    const summarySessions = document.getElementById('summarySessions');

    const TODO_KEY = 'arvseTodoTasks';
    const GOALS_KEY = 'arvseGoals';
    const SESSIONS_KEY = 'arvsePomodoroSessions';
    const SESSION_TARGET = 8;

    const loadJson = (key) => JSON.parse(localStorage.getItem(key) || '[]');
    const loadNumber = (key) => Number(localStorage.getItem(key) || 0);
    const rate = (completed, total) => (total > 0 ? Math.round((completed / total) * 100) : 0);

    const updateProgressBar = () => {
        const goals = loadJson(GOALS_KEY);
        const tasks = loadJson(TODO_KEY);
        const sessions = loadNumber(SESSIONS_KEY);

        const goalsCompleted = goals.filter((goal) => goal.completed).length;
        const goalsTotal = goals.length;
        const tasksCompleted = tasks.filter((task) => task.completed).length;
        const tasksTotal = tasks.length;
        const sessionsTotal = SESSION_TARGET;

        const goalRate = rate(goalsCompleted, goalsTotal);
        const taskRate = rate(tasksCompleted, tasksTotal);
        const sessionRate = rate(sessions, sessionsTotal);

        const activeRates = [];
        if (goalsTotal > 0) activeRates.push(goalRate);
        if (tasksTotal > 0) activeRates.push(taskRate);
        activeRates.push(sessionRate);
        const overallRate = activeRates.length > 0 ? Math.round(activeRates.reduce((sum, value) => sum + value, 0) / activeRates.length) : 0;

        goalsCompletedEl.textContent = goalsCompleted;
        goalsTotalEl.textContent = goalsTotal;
        tasksCompletedEl.textContent = tasksCompleted;
        tasksTotalEl.textContent = tasksTotal;
        sessionsCompletedEl.textContent = sessions;
        sessionsTotalEl.textContent = sessionsTotal;

        overallSummary.textContent = `${goalsCompleted} / ${goalsTotal} · ${overallRate}%`;
        overallFill.style.width = `${overallRate}%`;

        if (goalsDetail) goalsDetail.textContent = `${goalsCompleted} / ${goalsTotal} · ${goalRate}%`;
        if (tasksDetail) tasksDetail.textContent = `${tasksCompleted} / ${tasksTotal} · ${taskRate}%`;
        if (sessionsDetail) sessionsDetail.textContent = `${sessions} / ${sessionsTotal} · ${sessionRate}%`;

        if (summaryGoals) summaryGoals.textContent = goalsTotal;
        if (summaryTasks) summaryTasks.textContent = tasksTotal;
        if (summarySessions) summarySessions.textContent = sessionsTotal;
    };

    updateProgressBar();
});

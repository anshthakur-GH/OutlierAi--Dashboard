// Earnings Chart Data
const earningsData = [50, 75, 100, 60, 80, 90, 120];
const earningsLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Render Earnings Chart
const ctx = document.getElementById('earningsChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: earningsLabels,
        datasets: [{
            label: 'Earnings ($)',
            data: earningsData,
            backgroundColor: [
    'rgba(93, 63, 211, 0.6)', // purple
    'rgba(46, 204, 113, 0.6)', // green
    'rgba(241, 196, 15, 0.6)', // yellow
    'rgba(231, 76, 60, 0.6)', // red
    'rgba(52, 152, 219, 0.6)', // blue
    'rgba(155, 89, 182, 0.6)', // violet
    'rgba(230, 126, 34, 0.6)' // orange
],
            borderColor: [
    'rgba(93, 63, 211, 1)',
    'rgba(46, 204, 113, 1)',
    'rgba(241, 196, 15, 1)',
    'rgba(231, 76, 60, 1)',
    'rgba(52, 152, 219, 1)',
    'rgba(155, 89, 182, 1)',
    'rgba(230, 126, 34, 1)'
],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Leaderboard Data
const leaderboard = [
    { username: "User1", tasks: 50, points: 500 },
    { username: "User2", tasks: 48, points: 480 },
    { username: "User3", tasks: 45, points: 450 },
    { username: "User4", tasks: 42, points: 420 },
    { username: "User5", tasks: 40, points: 400 }
];

// Populate Leaderboard Table
const tbody = document.getElementById('leaderboardBody');
leaderboard.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.tasks}</td>
        <td>${user.points}</td>
    `;
    tbody.appendChild(row);
});

// --- Task History Timeline ---
const timelineData = [
    { task: "Data Annotation", date: "2025-05-01", points: 50 },
    { task: "Image Labeling", date: "2025-05-02", points: 30 },
    { task: "Text Review", date: "2025-05-03", points: 40 },
    { task: "Survey Analysis", date: "2025-05-04", points: 60 },
    { task: "Quality Check", date: "2025-05-05", points: 20 }
];
const timeline = document.getElementById('taskTimeline');
timelineData.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
            <div class="timeline-task">${item.task}</div>
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-points">+${item.points} pts</div>
        </div>
    `;
    timeline.appendChild(timelineItem);
});

// Dummy data
const currentTask = {
    name: "Data Annotation Project",
    description: "Annotate 100 images for object detection. Follow the labeling guidelines provided.",
    due: "2025-05-06",
    points: 80
};
const nextTask = {
    name: "Audio Transcription Batch",
    description: "Transcribe 20 short audio clips. Ensure accuracy and timestamp each segment.",
    due: "2025-05-09",
    points: 60
};

const viewCurrentTaskBtn = document.getElementById('viewCurrentTaskBtn');
const startNextTaskBtn = document.getElementById('startNextTaskBtn');

function showTaskModal(task, title) {
    let modal = document.getElementById('taskModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'taskModal';
        modal.innerHTML = `
            <div class="task-modal-content">
                <button class="task-modal-close" id="closeTaskModal">&times;</button>
                <h3 id="taskModalTitle"></h3>
                <div class="task-modal-details">
                    <div><strong>Task Name:</strong> <span id="taskModalName"></span></div>
                    <div><strong>Description:</strong> <span id="taskModalDesc"></span></div>
                    <div><strong>Due Date:</strong> <span id="taskModalDue"></span></div>
                    <div><strong>Points:</strong> <span id="taskModalPoints"></span></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('taskModalTitle').textContent = title;
    document.getElementById('taskModalName').textContent = task.name;
    document.getElementById('taskModalDesc').textContent = task.description;
    document.getElementById('taskModalDue').textContent = task.due;
    document.getElementById('taskModalPoints').textContent = task.points;
    modal.style.display = 'flex';
    document.getElementById('closeTaskModal').onclick = function() {
        modal.style.display = 'none';
    };
}

if (viewCurrentTaskBtn) {
    viewCurrentTaskBtn.addEventListener('click', () => {
        showTaskModal(currentTask, 'Current Task Details');
    });
}
if (startNextTaskBtn) {
    startNextTaskBtn.addEventListener('click', () => {
        showTaskModal(nextTask, 'Next Task Details');
    });
}


// --- Notifications Panel ---
const notificationsData = [
    { message: "New task assigned", time: "2025-05-02 10:00" },
    { message: "Payment processed", time: "2025-05-02 12:30" },
    { message: "Task approved", time: "2025-05-03 09:15" },
    { message: "Leaderboard updated", time: "2025-05-04 14:00" },
    { message: "New milestone reached", time: "2025-05-05 08:45" }
];
const notificationsPanel = document.getElementById('notificationsPanel');
const notificationsList = document.getElementById('notificationsList');
const openBtn = document.getElementById('openNotificationsBtn');
const closeBtn = document.getElementById('toggleNotifications');
const markAllReadBtn = document.getElementById('markAllReadBtn');

function renderNotifications(data) {
    notificationsList.innerHTML = '';
    if (data.length === 0) {
        const li = document.createElement('li');
        li.className = 'notification-item';
        li.textContent = 'No new notifications.';
        notificationsList.appendChild(li);
        return;
    }
    data.forEach(note => {
        const li = document.createElement('li');
        li.className = 'notification-item';
        li.innerHTML = `
            <div>${note.message}</div>
            <span class="notification-time">${note.time}</span>
        `;
        notificationsList.appendChild(li);
    });
}
renderNotifications(notificationsData);

openBtn.addEventListener('click', () => {
    notificationsPanel.classList.add('open');
    openBtn.style.display = 'none'; // Hide bell when sidebar opens
});
closeBtn.addEventListener('click', () => {
    notificationsPanel.classList.remove('open');
    openBtn.style.display = 'block'; // Show bell when sidebar closes
});
markAllReadBtn.addEventListener('click', () => {
    renderNotifications([]);
});

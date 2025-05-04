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
const leaderboardData = [
    {username: "EmmaStone", tasks: 50, points: 500, rank: 1, lastActive: "2025-05-04"},
    {username: "LiamParker", tasks: 45, points: 450, rank: 2, lastActive: "2025-05-03"},
    {username: "SophiaChen", tasks: 40, points: 400, rank: 3, lastActive: "2025-05-02"},
    {username: "NoahKhan", tasks: 38, points: 380, rank: 4, lastActive: "2025-05-04"},
    {username: "AvaSingh", tasks: 35, points: 350, rank: 5, lastActive: "2025-05-01"},
    {username: "JamesRao", tasks: 30, points: 300, rank: 6, lastActive: "2025-05-03"},
    {username: "IsabellaGupta", tasks: 28, points: 280, rank: 7, lastActive: "2025-05-02"},
    {username: "OliverMehta", tasks: 25, points: 250, rank: 8, lastActive: "2025-05-01"},
    {username: "MiaPatel", tasks: 20, points: 200, rank: 9, lastActive: "2025-05-03"},
    {username: "EthanSharma", tasks: 15, points: 150, rank: 10, lastActive: "2025-05-02"}
];

// --- Leaderboard Advanced Logic ---
(function(){
const PAGE_SIZE = 5;
let sortCol = 'rank';
let sortDir = 'asc';
let searchQuery = '';
let taskFilter = 'all';
let currentPage = 1;
const currentUser = 'SophiaChen';

const tbody = document.getElementById('leaderboardBody');
const searchInput = document.getElementById('leaderboardSearch');
const filterSelect = document.getElementById('taskFilter');
const clearBtn = document.getElementById('clearLeaderboardFilters');
const exportBtn = document.getElementById('exportLeaderboard');
const prevBtn = document.getElementById('leaderboardPrev');
const nextBtn = document.getElementById('leaderboardNext');
const pageIndicator = document.getElementById('leaderboardPageIndicator');
const sortArrows = {
  username: document.getElementById('sortArrow-username'),
  tasks: document.getElementById('sortArrow-tasks'),
  points: document.getElementById('sortArrow-points'),
  rank: document.getElementById('sortArrow-rank')
};

function getFilteredData() {
  let data = leaderboardData.slice();
  // Search: username or min points
  if (searchQuery.trim() !== '') {
    const q = searchQuery.trim();
    if (q.startsWith('>')) {
      const minPoints = parseInt(q.substring(1));
      if (!isNaN(minPoints)) {
        data = data.filter(u => u.points > minPoints);
      }
    } else {
      data = data.filter(u => u.username.toLowerCase().includes(q.toLowerCase()));
    }
  }
  // Filter: task ranges
  if (taskFilter === '50') {
    data = data.filter(u => u.tasks >= 50);
  } else if (taskFilter === '100') {
    data = data.filter(u => u.tasks >= 100);
  }
  return data;
}

function sortData(data) {
  return data.sort((a, b) => {
    let res = 0;
    if (sortCol === 'username') {
      res = a.username.localeCompare(b.username);
    } else {
      res = a[sortCol] - b[sortCol];
    }
    return sortDir === 'asc' ? res : -res;
  });
}

function renderTable() {
  tbody.innerHTML = '';
  let data = getFilteredData();
  data = sortData(data);
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageData = data.slice(startIdx, startIdx + PAGE_SIZE);
  pageData.forEach(user => {
    const row = document.createElement('tr');
    row.className = user.username === currentUser ? 'current-user-row' : '';
    row.setAttribute('data-username', user.username);
    row.setAttribute('title', `Last Active: ${user.lastActive}`);
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.tasks}</td>
      <td>${user.points}</td>
      <td>${user.rank}</td>
    `;
    tbody.appendChild(row);
  });
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  // Tooltips
  Array.from(tbody.querySelectorAll('tr')).forEach(row => {
    row.addEventListener('mouseenter', function(){
      const tip = document.createElement('div');
      tip.className = 'leaderboard-tooltip';
      tip.textContent = row.title;
      document.body.appendChild(tip);
      const rect = row.getBoundingClientRect();
      tip.style.left = rect.left + window.scrollX + 'px';
      tip.style.top = rect.top + window.scrollY - 32 + 'px';
      row._tip = tip;
    });
    row.addEventListener('mouseleave', function(){
      if (row._tip) document.body.removeChild(row._tip);
      row._tip = null;
    });
  });
}

function updateSortArrows() {
  Object.keys(sortArrows).forEach(col => {
    sortArrows[col].textContent = '';
    if (col === sortCol) {
      sortArrows[col].textContent = sortDir === 'asc' ? '▲' : '▼';
    }
  });
}

// Event Listeners
Array.from(document.querySelectorAll('.leaderboard-table th')).forEach(th => {
  th.addEventListener('click', function(){
    const col = th.getAttribute('data-sort');
    if (!col) return;
    if (sortCol === col) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortCol = col;
      sortDir = 'asc';
    }
    updateSortArrows();
    renderTable();
  });
});

searchInput.addEventListener('input', function(e){
  searchQuery = e.target.value;
  currentPage = 1;
  renderTable();
});

filterSelect.addEventListener('change', function(e){
  taskFilter = e.target.value;
  currentPage = 1;
  renderTable();
});

clearBtn.addEventListener('click', function(){
  searchQuery = '';
  taskFilter = 'all';
  searchInput.value = '';
  filterSelect.value = 'all';
  currentPage = 1;
  renderTable();
});

prevBtn.addEventListener('click', function(){
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});
nextBtn.addEventListener('click', function(){
  const data = getFilteredData();
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
});

exportBtn.addEventListener('click', function(){
  let data = sortData(getFilteredData());
  let csv = 'Username,Tasks Completed,Points,Rank\n';
  data.forEach(u => {
    csv += `${u.username},${u.tasks},${u.points},${u.rank}\n`;
  });
  alert('CSV Export (sample):\n' + csv);
});

updateSortArrows();
renderTable();
})();

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
        <div class="timeline-dot">&#8226;</div>
        <div class="timeline-content">
            <span class="timeline-task">${item.task}</span>
            <span class="timeline-date">${item.date}</span>
            <span class="timeline-points">+${item.points}</span>
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

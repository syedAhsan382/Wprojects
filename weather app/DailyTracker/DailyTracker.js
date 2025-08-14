let data = [];

function logActivity() {
  const activity = document.getElementById('activity').value.trim().toLowerCase();
  const hours = parseFloat(document.getElementById('hours').value);
  const date = document.getElementById('date').value;

  if (!activity || isNaN(hours) || !date) {
    alert("Please fill all fields.");
    return;
  }

  data.push({ activity, hours, date });
  updateSummary();
  updateChart();
  alert("Activity added!");
}

function getWeekData(activityType) {
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 6);

  return data.filter(entry => {
    const entryDate = new Date(entry.date);
    return entry.activity === activityType &&
           entryDate >= oneWeekAgo && entryDate <= now;
  });
}

function updateSummary() {
  const summary = document.getElementById('summaryCards');
  summary.innerHTML = '';

  const activities = [...new Set(data.map(d => d.activity))];

  activities.forEach(activity => {
    const weekData = getWeekData(activity);
    const total = weekData.reduce((sum, item) => sum + item.hours, 0);

    summary.innerHTML += `
      <div class="card">
        <strong>${activity.toUpperCase()}</strong>: ${total} hours (this week)
      </div>
    `;
  });
}

function updateChart() {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  const weekData = getWeekData('sleep');
  const labels = [];
  const hours = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    const dayStr = day.toISOString().split('T')[0];
    labels.push(dayStr);

    const entry = weekData.find(e => e.date === dayStr);
    hours.push(entry ? entry.hours : 0);
  }

  if (window.sleepChart) window.sleepChart.destroy();

  window.sleepChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Sleep Hours',
        data: hours,
        backgroundColor: 'rgba(0, 150, 136, 0.7)'
      }]
    }
  });
}

function handleSearch() {
  const q = document.getElementById('query').value.toLowerCase();
  const result = document.getElementById('searchResult');

  if (q.includes('sleep') && q.includes('this week')) {
    const weekData = getWeekData('sleep');
    const total = weekData.reduce((sum, item) => sum + item.hours, 0);
    result.innerText = `You slept ${total} hours this week.`;
  } else if (q.includes('work') && q.includes('this week')) {
    const weekData = getWeekData('work');
    const total = weekData.reduce((sum, item) => sum + item.hours, 0);
    result.innerText = `You worked ${total} hours this week.`;
  } else {
    result.innerText = "Sorry, I couldn't understand your question.";
  }
}
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.getElementById('refreshButton').addEventListener('click', () => {
  const button = document.getElementById('refreshButton');
  button.disabled = true;
  button.innerHTML = '↻ <span>Refreshing…</span>';
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '↻ <span>Refresh data</span>';
    showToast('Dashboard data refreshed successfully.');
  }, 700);
});

document.getElementById('exportButton').addEventListener('click', () => {
  const rows = [
    ['Metric', 'Value'],
    ['Total visitors', '48294'],
    ['Page views', '126580'],
    ['Bounce rate', '32.6%'],
    ['Average session', '3m 42s']
  ];
  const csv = rows.map(row => row.join(',')).join('\\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'pulseboard-report.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Your report has been exported.');
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    const period = tab.dataset.period;
    const values = {
      7: ['48,294', '126,580', '32.6', '3m 42s'],
      30: ['186,420', '492,810', '34.1', '3m 28s'],
      90: ['542,760', '1,428,300', '33.4', '3m 36s']
    }[period];
    document.getElementById('visitors').textContent = values[0];
    document.getElementById('pageviews').textContent = values[1];
    document.getElementById('bounce').innerHTML = values[2] + '<span class="unit">%</span>';
    document.getElementById('session').textContent = values[3];
    showToast(`Showing the last ${period} days.`);
  });
});

document.getElementById('menuButton').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    item.classList.add('active');
    if (item.textContent.trim() !== 'Overview') showToast(`${item.textContent.trim()} section is a demo view.`);
    if (window.innerWidth <= 760) document.getElementById('sidebar').classList.remove('open');
  });
});

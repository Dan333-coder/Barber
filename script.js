document.addEventListener('DOMContentLoaded', () => {
  const revenueChart = document.getElementById('revenueChart');
  const growthChart = document.getElementById('growthChart');

  const revenueData = [42000, 45000, 38500, 47000, 51000, 48500];
  const growthData = [12, 18, 23, 31, 45, 58];

  renderLineChart(revenueChart, revenueData, '#d4af37');
  renderBarChart(growthChart, growthData, '#f7e2a7');

  animateCounters();
});

function renderLineChart(container, data, color) {
  const max = Math.max(...data);
  container.innerHTML = '';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 360 260');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = `
    <defs>
      <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity=".8" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0" />
      </linearGradient>
    </defs>
  `;
  const pathPoints = data.map((value, index) => {
    const x = 40 + index * 52;
    const y = 220 - (value / max) * 180;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathPoints);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);

  const fillPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  fillPath.setAttribute('d', `${pathPoints} L 310 240 L 40 240 Z`);
  fillPath.setAttribute('fill', 'url(#lineGrad)');
  fillPath.setAttribute('opacity', '.45');
  svg.insertBefore(fillPath, path);
  container.appendChild(svg);

  const points = data.map((value, index) => {
    const dot = document.createElement('div');
    dot.className = 'chart-dot';
    dot.style.left = `${40 + index * 52}px`;
    dot.style.top = `${220 - (value / max) * 180}px`;
    return dot;
  });
  points.forEach((dot) => container.appendChild(dot));
}

function renderBarChart(container, data, color) {
  const max = Math.max(...data);
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'bar-grid';
  data.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar-item';
    bar.innerHTML = `<div class="bar-fill" style="height:${Math.round((value / max) * 100)}%; background: linear-gradient(180deg, ${color}, rgba(212,175,55,.35));"></div><span>Wk ${index + 1}</span>`;
    grid.appendChild(bar);
  });
  container.appendChild(grid);
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  const values = [1240, 58, 48500, 320, 12];
  counters.forEach((counter, index) => {
    const target = values[index];
    let current = 0;
    const increment = Math.ceil(target / 45);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = index === 2 ? `₹${current.toLocaleString('en-IN')}` : current.toLocaleString('en-IN');
    }, 20);
  });
}

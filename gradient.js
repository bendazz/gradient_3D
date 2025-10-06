// gradient.js
// Plot z = x**2 + y**2 + 10 on page load


document.addEventListener('DOMContentLoaded', () => {
  const xSlider = document.getElementById('xSlider');
  const ySlider = document.getElementById('ySlider');
  const xValue = document.getElementById('xValue');
  const yValue = document.getElementById('yValue');
    const surfaceToggle = document.getElementById('surfaceToggle');

  function updatePlot() {
  xValue.textContent = (Number(xSlider.value) >= 0 ? '+' : '') + Number(xSlider.value).toFixed(2);
  yValue.textContent = (Number(ySlider.value) >= 0 ? '+' : '') + Number(ySlider.value).toFixed(2);
      drawAxes(Number(xSlider.value), Number(ySlider.value), surfaceToggle.checked);
  }

  xSlider.addEventListener('input', updatePlot);
  ySlider.addEventListener('input', updatePlot);
    surfaceToggle.addEventListener('change', updatePlot);
  updatePlot();
});

function drawAxes(x, y, showSurface = true) {
  // Compute partial derivatives at (x, y)
  let gradX = 0, gradY = 0;
  if (typeof x === 'number' && typeof y === 'number') {
    gradX = 2 * x;
    gradY = 2 * y;
  }

  // Draw gradient vectors in the plane
  let gradVecX = null, gradVecY = null, gradVecTotal = null;
  if (typeof x === 'number' && typeof y === 'number') {
    // Scale for visualization
    const scale = 3;
    gradVecX = {
      type: 'scatter3d',
      mode: 'lines',
      x: [x, x + gradX * scale],
      y: [y, y],
      z: [0, 0],
      line: { color: 'black', width: 6 },
      hoverinfo: 'skip',
      showlegend: false,
    };
    gradVecY = {
      type: 'scatter3d',
      mode: 'lines',
      x: [x, x],
      y: [y, y + gradY * scale],
      z: [0, 0],
      line: { color: 'black', width: 6 },
      hoverinfo: 'skip',
      showlegend: false,
    };
    gradVecTotal = {
      type: 'scatter3d',
      mode: 'lines',
      x: [x, x + gradX * scale],
      y: [y, y + gradY * scale],
      z: [0, 0],
      line: { color: 'black', width: 8 },
      hoverinfo: 'skip',
      showlegend: false,
    };
  }
  // Axes
  const axisMin = -15, axisMax = 15;
  const c = 30;
  const zMin = axisMin, zMax = axisMax * axisMax + c + 10;
  const axes = [
    {
      type: 'scatter3d',
      mode: 'lines',
      x: [axisMin, axisMax],
      y: [0, 0],
      z: [0, 0],
      line: { color: 'red', width: 6 },
      hoverinfo: 'skip',
      showlegend: false,
    },
    {
      type: 'scatter3d',
      mode: 'lines',
      x: [0, 0],
      y: [axisMin, axisMax],
      z: [0, 0],
      line: { color: 'green', width: 6 },
      hoverinfo: 'skip',
      showlegend: false,
    },
    {
      type: 'scatter3d',
      mode: 'lines',
      x: [0, 0],
      y: [0, 0],
      z: [zMin, zMax],
      line: { color: 'blue', width: 6 },
      hoverinfo: 'skip',
      showlegend: false,
    }
  ];

  // Grid on xy plane
  const gridLines = [];
  const gridMin = axisMin, gridMax = axisMax, gridStep = 1;
  for (let x = gridMin; x <= gridMax; x += gridStep) {
    gridLines.push({
      type: 'scatter3d',
      mode: 'lines',
      x: [x, x],
      y: [gridMin, gridMax],
      z: [0, 0],
      line: { color: '#bbb', width: 2 },
      hoverinfo: 'skip',
      showlegend: false,
    });
  }
  for (let y = gridMin; y <= gridMax; y += gridStep) {
    gridLines.push({
      type: 'scatter3d',
      mode: 'lines',
      x: [gridMin, gridMax],
      y: [y, y],
      z: [0, 0],
      line: { color: '#bbb', width: 2 },
      hoverinfo: 'skip',
      showlegend: false,
    });
  }

  // Surface z = x^2 + y^2 + 10
  const xRange = linspace(axisMin, axisMax, 60);
  const yRange = linspace(axisMin, axisMax, 60);
  const zData = [];
  for (let i = 0; i < xRange.length; i++) {
    const row = [];
    for (let j = 0; j < yRange.length; j++) {
      row.push(xRange[i] ** 2 + yRange[j] ** 2 + c);
    }
    zData.push(row);
  }
  const surface = {
    z: zData,
    x: xRange,
    y: yRange,
    type: 'surface',
    colorscale: 'YlGnBu',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'skip',
  };

  let point = null, surfacePoint = null, connector = null, traceX = null, traceY = null;
  if (typeof x === 'number' && typeof y === 'number') {
    const px = x;
    const py = y;
    const pz = px ** 2 + py ** 2 + c;
    point = {
      type: 'scatter3d',
      mode: 'markers',
      x: [px],
      y: [py],
      z: [0],
      marker: { color: 'orange', size: 8, opacity: 0.95 },
      hoverinfo: 'skip',
      showlegend: false,
    };
    surfacePoint = {
      type: 'scatter3d',
      mode: 'markers',
      x: [px],
      y: [py],
      z: [pz],
      marker: { color: 'purple', size: 8, opacity: 0.95 },
      hoverinfo: 'skip',
      showlegend: false,
    };
    connector = {
      type: 'scatter3d',
      mode: 'lines',
      x: [px, px],
      y: [py, py],
      z: [0, pz],
      line: { color: 'gray', width: 4, dash: 'dot' },
      hoverinfo: 'skip',
      showlegend: false,
    };
    // Parabolic trace for x fixed (vary y)
    const traceYy = [], traceYz = [];
    for (let yy = axisMin; yy <= axisMax; yy += 0.2) {
      traceYy.push(yy);
      traceYz.push(px ** 2 + yy ** 2 + c);
    }
    traceY = {
      type: 'scatter3d',
      mode: 'lines',
      x: Array(traceYy.length).fill(px),
      y: traceYy,
      z: traceYz,
      line: { color: 'red', width: 8 },
      hoverinfo: 'skip',
      showlegend: false,
    };
    // Parabolic trace for y fixed (vary x)
    const traceXx = [], traceXz = [];
    for (let xx = axisMin; xx <= axisMax; xx += 0.2) {
      traceXx.push(xx);
      traceXz.push(xx ** 2 + py ** 2 + c);
    }
    traceX = {
      type: 'scatter3d',
      mode: 'lines',
      x: traceXx,
      y: Array(traceXx.length).fill(py),
      z: traceXz,
      line: { color: 'green', width: 8 },
      hoverinfo: 'skip',
      showlegend: false,
    };
  }

  const data = [...axes, ...gridLines];
  if (showSurface) {
    data.push(surface);
  }
  if (point) {
    data.push(point);
  }
  if (surfacePoint) {
    data.push(surfacePoint);
  }
  if (connector) {
    data.push(connector);
  }
  if (traceX) {
    data.push(traceX);
  }
  if (traceY) {
    data.push(traceY);
  }
  if (gradVecX) {
    data.push(gradVecX);
  }
  if (gradVecY) {
    data.push(gradVecY);
  }
  if (gradVecTotal) {
    data.push(gradVecTotal);
  }

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    scene: {
      xaxis: {
        visible: false,
        showgrid: false,
        zeroline: false,
        range: [axisMin, axisMax],
      },
      yaxis: {
        visible: false,
        showgrid: false,
        zeroline: false,
        range: [axisMin, axisMax],
      },
      zaxis: {
        visible: false,
        showgrid: false,
        zeroline: false,
        range: [zMin, zMax],
      },
      bgcolor: '#f7f7f9',
    },
    showlegend: false,
  };

  const plotDiv = document.getElementById('plot');
  let camera = undefined;
  if (plotDiv && plotDiv._fullLayout && plotDiv._fullLayout.scene && plotDiv._fullLayout.scene.camera) {
    camera = plotDiv._fullLayout.scene.camera;
  }
  if (camera) {
    layout.scene.camera = camera;
  }
  Plotly.react('plot', data, layout, {responsive: true});

function linspace(a, b, n) {
  const arr = [];
  const step = (b - a) / (n - 1);
  for (let i = 0; i < n; i++) {
    arr.push(a + step * i);
  }
  return arr;
}
}

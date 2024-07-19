const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const width = 800;
const height = 600;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// Маршрут для кореневої URL
app.get('/chart-data', (req, res) => {
  // Приклад даних для графіку
  // Замініть цей код на реальні дані з вашої бази даних або інших джерел
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    data: Array(24).fill(0)
  };

  res.json(data);
});

// Маршрут для генерації графіку
app.post('/generate-chart', async (req, res) => {
  const { hour, duration } = req.body;

  // Створення даних для графіку
  const data = Array(24).fill(0);
  data[hour] = duration;

  const chartConfig = {
    type: 'bar',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [{
        label: 'Тривалість відключень',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  };

  try {
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error generating chart:', error);
    res.status(500).send('Error generating chart');
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

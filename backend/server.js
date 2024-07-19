const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ChartJSNodeCanvas = require('chartjs-node-canvas').ChartJSNodeCanvas;

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let updateData = []; // Масив для зберігання даних оновлень

// Простий маршрут для кореневого URL
app.get('/', (req, res) => {
    res.send('Server is running. Use /generate-chart to post data and /chart-data to get chart data.');
});

// Отримання даних від Telegram бота
app.post('/generate-chart', (req, res) => {
    const { hour, duration } = req.body;
    updateData.push({ hour, duration });
    res.sendStatus(200);
});

// Повернення оброблених даних для побудови графіку
app.get('/chart-data', (req, res) => {
    const labels = updateData.map(data => data.hour);
    const durations = updateData.map(data => data.duration);
    res.json({ labels, data: durations });
});

// Генерація графіку
app.post('/generate-chart', async (req, res) => {
    try {
        const { hour, duration } = req.body;
        updateData.push({ hour, duration });

        const width = 800;
        const height = 600;
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
        const configuration = {
            type: 'line',
            data: {
                labels: updateData.map(data => data.hour),
                datasets: [{
                    label: 'Duration of Updates',
                    data: updateData.map(data => data.duration),
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                }]
            }
        };

        const image = await chartJSNodeCanvas.renderToBuffer(configuration);
        res.set('Content-Type', 'image/png');
        res.send(image);
    } catch (error) {
        console.error('Error generating chart:', error);
        res.status(500).send('Error generating chart');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

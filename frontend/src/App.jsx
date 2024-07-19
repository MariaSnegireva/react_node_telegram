import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

import './App.css';

export const App = () => {
  const [chartData, setChartData] = useState({ 
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/chart-data');
        const { labels, data } = response.data;

        if (Array.isArray(labels) && Array.isArray(data)) {
          // Перетворення даних у числовий формат (години)
          const convertedData = data.map(duration => {
            const [hours, minutes] = duration.split('h').map(str => parseInt(str.replace('m', '').trim()) || 0);
            return hours + (minutes / 60);
          });

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Тривалість відключень (години)',
                data: convertedData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h1>Telegram Channel Analytics</h1>
      <Bar data={chartData} />
    </div>
  );
}

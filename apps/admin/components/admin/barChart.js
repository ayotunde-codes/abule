import { Chart } from 'react-chartjs-2';
import React, { useState } from 'react';
import {
  Chart as ChartJS, BarController, BarElement, CategoryScale, PointElement, LinearScale, Title,
} from 'chart.js';
ChartJS.register(BarController, BarElement, PointElement, CategoryScale, LinearScale, Title);

const defaultData = {
  labels: ['Tribe', 'Activies', 'Calendar', 'Sitting', 'Tutoring'],
  datasets: [{
    data: [
      20,
      80,
      40,
      50,
      62,
    ],
    label: '',
    backgroundColor: [
      'rgba(248, 173, 208, 1)',
      'rgba(172, 246, 249, 1)',
      'rgba(245, 224, 115, 1)',
      'rgba(119, 165, 255, 1)',
      'rgba(201, 201, 201, 1)',
    ],
  }],
};

const BarChart = () => {
  const [data, setData] = useState(defaultData);
  const [options, setOptions] = useState({
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    aspectRatio: 2,
  });

  return (
     <Chart
        type="bar"
        data={data}
        options={options}
      /> 
  );
};

export default BarChart;
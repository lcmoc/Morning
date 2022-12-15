import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import React from 'react';

interface WeekDiagramProps {
  times: String[];
  measures: number[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Wetterdaten',
    },
  },
};

const DayDiagram = ({ times, measures }: WeekDiagramProps): JSX.Element => {
  const data = {
    labels: times,
    datasets: [
      {
        label: 'Sales',
        data: measures,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default DayDiagram;

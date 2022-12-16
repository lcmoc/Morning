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
  maintainAspectRatio: true,
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

const styles = {
  Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    width: '100%',
  },

  ChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    width: '800px',
    height: '500px',
  },
};

const DayDiagram = ({ times, measures }: WeekDiagramProps): JSX.Element => {
  const data = {
    labels: times,
    datasets: [
      {
        label: 'Grad',
        data: measures,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.Container}>
      <div style={styles.ChartContainer}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default DayDiagram;

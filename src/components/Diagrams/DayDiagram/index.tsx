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
  ChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    width: '80%',
    height: '100%',
  },
  '@media (min-width: 600px)': {
    ChartContainer: {
      width: '600px',
      height: '400px',
    },
  },
  '@media (min-width: 900px)': {
    ChartContainer: {
      width: '900px',
      height: '600px',
    },
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
    <div className="flex justify-center items-center flex-col w-full bg-gray-50">
      <div
        style={styles.ChartContainer}
        className="md:w-32 lg:w-48 mt-10 mb-24"
      >
        <Line options={options} data={data} />
        <hr />
      </div>
    </div>
  );
};

export default DayDiagram;

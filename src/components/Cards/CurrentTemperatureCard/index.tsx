import React from 'react';
import { getDate } from '../../Helpers';

interface CurrentTemperatureCardProps {
  temperature: number[];
  date: any;
  measure: string;
}

const checkIfItsToday = (weekday: string): boolean => {
  const newDate = new Date();
  return newDate.toLocaleDateString('de', { weekday: 'long' }) === weekday;
};

const CurrentTemperatureCard = ({
  temperature,
  date,
  measure,
}: CurrentTemperatureCardProps): JSX.Element => {
  const newDate = new Date(getDate(date));
  const weekday = newDate.toLocaleDateString('de', { weekday: 'long' });
  const maxTemp = temperature.reduce((a, b) => Math.max(a, b));
  const minTemp = temperature.reduce((a, b) => Math.min(a, b)); // 1

  return (
    <button className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 h-60 w-40 xl:w-40 xl:h-72 mb-24">
      <h5 className="mb-2 text-sm lg:text-xl font-bold tracking-tight text-gray-900 text-center">
        {checkIfItsToday(weekday) ? 'Heute' : weekday}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {`${maxTemp} - ${minTemp} ${measure}`}
      </p>
    </button>
  );
};

export default CurrentTemperatureCard;

import React, { useEffect, useRef, useState } from 'react';

import CurrentTemperatureCard from '../../components/Cards/CurrentTemperatureCard';
import DayDiagram from '../../components/Diagrams/DayDiagram';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getTimes } from '../../components/Helpers';

interface ApiData {
  time: [];
}

const Weather = (): JSX.Element => {
  const [apiData, setApiData] = useState<any | null>(null);
  const [temps, setTemps] = useState<any | any>(0);
  const tempRefs: any = useRef([]);
  const dayRefs: any = useRef([]);
  async function getDataFromAPI(): Promise<ApiData | undefined> {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=47.37&longitude=8.55&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin',
      );

      return await response.json();
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }
  const getSplittedDays = (allDays: string[], length: number): string[][] => {
    const arrayLength = allDays.length / length;
    const result = [];
    const alldaysCopy = JSON.parse(JSON.stringify(allDays));

    for (let i = 0; i < arrayLength; i++) {
      const counter = i;
      result.push(alldaysCopy.slice(counter * 24, (counter + 1) * 24));
    }
    return result;
  };

  const getSplittetTemps = (allDays: number[], length: number): number[][] => {
    const arrayLength = allDays.length / length;
    const result = [];
    for (let i = 0; i < arrayLength; i++) {
      result.push(allDays.slice(i * 24, (i + 1) * 24));
    }
    return result;
  };

  useEffect(() => {
    getDataFromAPI()
      .then((data: any) => {
        tempRefs.current = getSplittetTemps(data?.hourly.temperature_2m, 24);
        dayRefs.current = getSplittedDays(data?.hourly.time, 24);
        setApiData(data);
      })
      .catch((error) => {
        console.error(error); //eslint-disable-line
      });
  }, []);
  if (apiData === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen mt-24">
      <div className="flex items-center justify-center">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-sky-800">
          Wetter
        </h1>
      </div>

      <div className="flex items-center justify-center mr-8 ml-8 overflow-x-auto">
        {dayRefs.current.map((day: any, index: any): JSX.Element => {
          return (
            <div
              key={day[index]}
              onClick={(event) => {
                setTemps(tempRefs.current[index]);
              }}
            >
              <CurrentTemperatureCard
                temperature={tempRefs.current[index]}
                date={day[0]}
                measure={apiData?.hourly_units.temperature_2m}
              />
            </div>
          );
        })}
      </div>

      <DayDiagram times={getTimes(apiData?.hourly.time)} measures={temps} />
    </div>
  );
};

export default Weather;

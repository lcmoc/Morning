import React, { useEffect, useState } from 'react';

import CurrentTemperatureCard from '../../components/CurrentTemperatureCard';
import DayDiagram from '../../components/Diagrams/DayDiagram';
import { Grid } from '@mui/material';

interface ApiData {
  time: [];
}

const Weather = (): JSX.Element => {
  const [apiData, setApiData] = useState<any | null>(null);

  async function getDataFromAPI(): Promise<ApiData | undefined> {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=47.37&longitude=8.55&hourly=temperature_2m&current_weather=true&timezone=Europe%2FBerlin&past_days=1',
      );

      return await response.json();
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  useEffect(() => {
    getDataFromAPI()
      .then((data) => setApiData(data))
      .catch((error) => {
        console.error(error); //eslint-disable-line
      });
  }, []);
  if (apiData === null) {
    return <div>Loading...</div>;
  }

  // const dates = apiData?.hourly.time.slice(0, 7).map((oneDate: string) => {
  //   const parts = oneDate.split('T', 2);
  //   const fullDates = parts[0];
  //   const dates = fullDates.split('-');
  //   const formattedDates = `${dates[2]}-${dates[1]}`;

  //   return formattedDates;
  // });

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  const getDataFromCurrentDate = (dateString: string): string | undefined => {
    const isDate = dateFormatRegex.test(dateString);
    if (isDate) {
      const date = new Date(dateString);
      if (
        date.getFullYear() === new Date().getFullYear() &&
        date.getMonth() === new Date().getMonth() &&
        date.getDate() === new Date().getDate()
      ) {
        return dateString;
      }
    }
    return undefined;
  };

  const dates = apiData?.hourly.time.map((oneDate: string) => {
    const parts = oneDate.split('T', 2);
    const date = parts[0];
    return date;
  });

  const currentDayTimes = dates.filter((date: string) => {
    return getDataFromCurrentDate(date);
  });

  const currentDayStartHour: number = apiData?.hourly.time.indexOf(
    `${currentDayTimes[0]}T00:00`, // eslint-disable-line
  );

  const currentDayEndHour = currentDayStartHour + 25;

  console.log('aaaaa', currentDayStartHour, currentDayEndHour); // eslint-disable-line

  const times = apiData?.hourly.time
    .splice(currentDayStartHour + 1, currentDayEndHour)
    .map((oneDate: string) => {
      // const parts = oneDate.split('T', 2);
      // const time = parts[1];
      return oneDate;
    });

  const measures = apiData?.hourly.temperature_2m
    .splice(0, 24)
    .map((temp: string) => {
      return temp;
    });

  console.log('measures', measures); // eslint-disable-line
  console.log('apiData', apiData); // eslint-disable-line

  const currentTemp = apiData?.current_weather;

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <h1>Weather</h1>
        <CurrentTemperatureCard
          temperature={currentTemp.temperature}
          time={currentTemp.time}
          measure={apiData?.hourly_units.temperature_2m}
        />
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={10}>
          <DayDiagram times={times} measures={measures} />
          test
        </Grid>
      </Grid>
    </div>
  );
};

export default Weather;

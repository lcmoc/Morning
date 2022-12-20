import React, { useEffect, useState } from 'react';
import {
  getMeasures,
  getTimes,
  getTodaysMaxTemp,
  getTodaysMinTemp,
  getTodaysSunRise,
  getTodaysSunSet,
} from '../../components/Helpers';

import CurrentMaxMinTemperatureCard from '../../components/Cards/CurrentMaxMinTemperatureCard';
import CurrentSunriseCard from '../../components/Cards/CurrentSunRiseCard';
import CurrentTemperatureCard from '../../components/Cards/CurrentTemperatureCard';
import DayDiagram from '../../components/Diagrams/DayDiagram';
import { Grid } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';

interface ApiData {
  time: [];
}

const Weather = (): JSX.Element => {
  const [apiData, setApiData] = useState<any | null>(null);

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

  useEffect(() => {
    getDataFromAPI()
      .then((data) => setApiData(data))
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

  const currentTemp = apiData?.current_weather;

  return (
    <div className="h-screen mt-24">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <h1>Wetter</h1>
        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="start"
          justifyContent="space-around"
        >
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CurrentTemperatureCard
              temperature={currentTemp.temperature}
              time={currentTemp.time}
              measure={apiData?.hourly_units.temperature_2m}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CurrentSunriseCard
              sunrise={getTodaysSunRise(apiData?.daily?.sunrise)}
              sunset={getTodaysSunSet(apiData?.daily?.sunset)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CurrentMaxMinTemperatureCard
              minTemp={getTodaysMinTemp(apiData?.daily?.temperature_2m_min)}
              maxTemp={getTodaysMaxTemp(apiData?.daily?.temperature_2m_max)}
              measure={apiData?.hourly_units.temperature_2m}
            />
          </Grid>
        </Grid>
      </Grid>
      <DayDiagram
        times={getTimes(apiData?.hourly.time)}
        measures={getMeasures(apiData?.hourly.temperature_2m)}
      />
    </div>
  );
};

export default Weather;

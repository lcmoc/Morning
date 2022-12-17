import { Grid } from '@mui/material';
import HomeCard from '../../components/HomeCard';
import React from 'react';
import SbbPng from '../../assets/u-bahn.png';
import WeatherPng from '../../assets/weather.png';

const Home = (): JSX.Element => (
  <>
    <div className="flex items-center justify-center mt-24 mb-24">
      <h1 className="text-6xl mb-4">Morning</h1>
    </div>
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="start"
      justifyContent="space-around"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <HomeCard
          name="sbb"
          txt="See sbb connections"
          imgSrc={SbbPng}
          path="someLink"
          alt="u-bahn image"
        />
      </Grid>
      <Grid item xs={3}>
        <HomeCard
          name="Weather"
          txt="See the Weather of today"
          imgSrc={WeatherPng}
          path="/weather"
          alt="Wetter icons"
        />
      </Grid>
    </Grid>
  </>
);

export default Home;

import { Grid } from '@mui/material';
import HomeCard from '../../components/Cards/HomeCard';
import React from 'react';
import SbbPng from '../../assets/u-bahn.png';
import WeatherPng from '../../assets/weather.png';

const Home = (): JSX.Element => (
  <>
    <div className="flex items-center justify-center mt-24 mb-24">
      <h1 className="text-8xl leading-normal mt-0 mb-2 text-red-700">
        Morning
      </h1>
    </div>
    <div className="flex justify-center items-center">
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="start"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          container
          alignItems="start"
          justifyContent="center"
        >
          <div className="p-2">
            <HomeCard
              name="SBB"
              txt="See SBB connections"
              imgSrc={SbbPng}
              path="/sbb"
              alt="u-bahn image"
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          alignItems="start"
          justifyContent="center"
        >
          <div className="p-2">
            <HomeCard
              name="Weather"
              txt="See the Weather of today"
              imgSrc={WeatherPng}
              path="/weather"
              alt="Wetter icons"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  </>
);

export default Home;

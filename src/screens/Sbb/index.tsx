import '../Home/styles.css';

import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import TrainTable from '../../components/TrainTable';

interface ApiData {
  time: [];
}

const Sbb = (): JSX.Element => {
  const [apiData, setApiData] = useState<any | null>(null);
  const [journeyStartPoint, setJourneyStartPoint] = useState('Egg');
  const [send, setSend] = useState(false);

  async function getDataFromAPI(): Promise<ApiData | undefined> {
    try {
      const response = await fetch(
        `https://transport.opendata.ch/v1/connections?from=${journeyStartPoint}&to=Wintertuhr`,
      );

      return await response.json();
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  useEffect(() => {
    getDataFromAPI()
      .then((data: any) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error(error); //eslint-disable-line
      });
  }, [send]);

  if (apiData === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <LoadingSpinner />
      </div>
    );
  }

  const handleClick = (event: any): void => {
    event.preventDefault();
    setSend(true);
  };

  const handleChange = (event: any): void => {
    event.preventDefault();
    send && setSend(false);
    setJourneyStartPoint(event.target.value);
  };

  const connections = apiData?.connections;

  return (
    <div className="min-h-screen mt-24 bg-rose-50">
      <div className="flex items-center justify-center">
        <h1 className="lg:text-6xl md:text-6xl text-4xl leading-normal mt-3 mb-2 text-red-700 TitleScreen">
          Bahnverbindung
        </h1>
      </div>

      <div className="w-full flex items-center justify-center mb-4">
        <div className="flex items-center justify-around flex-row p-4">
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Startpunkt"
            type="text"
            value={journeyStartPoint}
            onChange={(event) => handleChange(event)}
          />
          <Button
            color="error"
            endIcon={<SendIcon />}
            type="submit"
            style={{ textTransform: 'none', marginLeft: '20px' }}
            onClick={(event) => handleClick(event)}
          >
            Suchen
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="max-w-3xl mb-12">
          <TrainTable connectionDepartures={connections} />
        </div>
      </div>
    </div>
  );
};

export default Sbb;

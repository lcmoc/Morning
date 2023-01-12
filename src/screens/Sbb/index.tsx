import React, { useEffect, useState } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import TrainTable from '../../components/TrainTable';

interface ApiData {
  time: [];
}

const Sbb = (): JSX.Element => {
  const [apiData, setApiData] = useState<any | null>(null);
  const [journeyStartPoint, setJourneyStartPoint] = useState('Egg');

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

  console.log(`https://transport.opendata.ch/v1/connections?from=${journeyStartPoint}&to=Wintertuhr`); // eslint-disable-line

  useEffect(() => {
    getDataFromAPI()
      .then((data: any) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error(error); //eslint-disable-line
      });
  }, [journeyStartPoint]);

  if (apiData === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <LoadingSpinner />
      </div>
    );
  }

  // von Station
  // console.log('xxx', apiData.connections[0].from.departure); // eslint-disable-line
  // Bis Station
  // console.log('xxx', apiData.connections[0].to.departure); // eslint-disable-line

  // console.log('xxx', apiData.connections[0].sections[0].journey.passList[0].station.name); // eslint-disable-line

  console.log('xxx', apiData.connections[0]); // eslint-disable-line

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center mb-32">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-sky-800">
          Bahnverbindung
        </h1>
      </div>
      <div>
        <input
          type="text"
          onChange={(event) => setJourneyStartPoint(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-82">
          <TrainTable connectionDepartures={apiData?.connections} />
        </div>
      </div>
    </div>
  );
};

export default Sbb;
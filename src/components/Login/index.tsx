import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import LoadingSpinner from '../LoadingSpinner';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<String | any>('');
  const [password, setPassword] = useState<String | any>('');
  const [error, setError] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(['userIsLoggedIn']); //eslint-disable-line
  const [apiData, setApiData] = useState<any | null>(null);

  interface ApiData {
    time: [];
  }

  async function getDataFromAPI(): Promise<ApiData | undefined> {
    try {
      const response = await fetch(
        'https://morning-backend-production.up.railway.app/students',
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
  }, []);
  if (apiData === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <LoadingSpinner />
      </div>
    );
  }

  const checkCredentials = (email: string, password: string): void => {
    for (const entry of apiData) {
      if (entry.email === email && entry.password === password) {
        setCookie('userIsLoggedIn', true, {
          path: '/',
        });
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const send = (event: any): void => {
    event.preventDefault();
    checkCredentials(email, password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-start flex-col">
      <h1 className="text-6xl font-normal leading-normal mt-4  text-red-800">
        Einloggen
      </h1>

      <form onSubmit={(event) => send(event)}>
        <div className="flex items-center justify-around flex-col mt-24 border-2 drop-shadow-xl border-red-400 rounded bg-red-100 w-fit">
          <div className="flex items-center justify-around flex-row p-4">
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
                sm={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="E-Mail"
                  type="email"
                  onChange={(event) => setEmail(event?.target?.value)}
                  error={error}
                  value={email}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Passwort"
                  type="password"
                  onChange={(event) => setPassword(event?.target?.value)}
                  error={error}
                  value={password}
                />
              </Grid>
            </Grid>
          </div>
          <div className="mt-3 p-4">
            <Button
              variant="outlined"
              color="error"
              endIcon={<SendIcon />}
              type="submit"
            >
              Überprüfen
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import Footer from '../Footer';
import Header from '../Header';
import Home from '../../screens/Home';
import Login from '../Login';
import React from 'react';
import Sbb from '../../screens/Sbb';
import Weather from '../../screens/Weather';
import { useCookies } from 'react-cookie';

const Content = (): JSX.Element => {
const [cookies, setCookie] = useCookies(['userIsLoggedIn']); //eslint-disable-line

  return (
    <Router>
      <Header />
      {!(cookies.userIsLoggedIn as boolean) && <Login />}
      <Routes>
        <Route
          path="/"
          element={(cookies.userIsLoggedIn as boolean) && <Home />}
        />
        <Route
          path="/weather"
          element={(cookies.userIsLoggedIn as boolean) && <Weather />}
        />
        <Route
          path="/sbb"
          element={(cookies.userIsLoggedIn as boolean) && <Sbb />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Content;

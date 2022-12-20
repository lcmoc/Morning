import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from '../Header';
// import Footer from '../Footer';
import Home from '../../screens/Home';
import Login from '../Login';
import React from 'react';
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
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Content;

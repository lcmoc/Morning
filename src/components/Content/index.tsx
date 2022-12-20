import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from '../Header';
// import Footer from '../Footer';
import Home from '../../screens/Home';
import Login from '../Login';
import React from 'react';
import Weather from '../../screens/Weather';
import { useDoc } from '@syncstate/react';

const Content = (): JSX.Element => {
  const [userIsLoggedIn] = useDoc('/userIsLoggedIn');

  return (
    <Router>
      <Header />
      {!(userIsLoggedIn as boolean) && <Login />}
      <Routes>
        <Route path="/" element={(userIsLoggedIn as boolean) && <Home />} />
        <Route
          path="/weather"
          element={(userIsLoggedIn as boolean) && <Weather />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Content;

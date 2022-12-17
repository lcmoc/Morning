import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from '../Header';
// import Footer from '../Footer';
import Home from '../../screens/Home';
import React from 'react';
import Weather from '../../screens/Weather';

const Content = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Content;

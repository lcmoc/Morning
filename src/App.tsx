import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';
import React from 'react';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;

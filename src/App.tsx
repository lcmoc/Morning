import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import React from 'react';

const App = (): JSX.Element => {
  return (
    <div className="App">
      Header
      <Router>
        <Routes>
          <Route path="/" element={<div>Main stuff</div>} />
        </Routes>
      </Router>
      Footer
    </div>
  );
};

export default App;

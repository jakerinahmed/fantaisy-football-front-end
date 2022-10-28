import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Navbar } from './layout'
import { Home, About, Recommendations } from './pages'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='/about' element={<About />} />
         <Route path='/recommendations' element={<Recommendations />} />
        {/*<Route path='/predictions' element={<Predictions />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;

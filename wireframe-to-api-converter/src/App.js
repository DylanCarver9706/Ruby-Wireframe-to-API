import React from 'react';
import { Routes, Route } from "react-router-dom"
import WireFrameMaker from './WireFrameMaker';
import Home from './Home';
import Navbar from './Navbar';

const App = () => {
  return (
    <div className="App">
      {/* <WireFrameMaker/> */}
      <>
      <Navbar />
      </>
      
        <Routes>
          <Route path="/" exact element={ <Home/>} />
          <Route path="/wireframe-maker" element={<WireFrameMaker/>} />
          {/* <Route path="/all-photos" element={</>} /> */}
        </Routes>
    </div>
  );
};

export default App;
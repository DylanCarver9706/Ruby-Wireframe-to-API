import React from 'react';
import { Routes, Route } from "react-router-dom"
import WireFrameMaker from './WireFrameMaker';
import Home from './Home';
import Navbar from './Navbar';
import HowToUse from './HowToUse'

const App = () => {
  return (
    <div className="App">
      {/* <WireFrameMaker/> */}
      <>
      <Navbar />
      </>
      
        <Routes>
          <Route path="Ruby-Wireframe-to-API/" exact element={ <Home/>} />
          <Route path="Ruby-Wireframe-to-API/wireframe-maker" element={<WireFrameMaker/>} />
          <Route path="Ruby-Wireframe-to-API/how-to-use" element={<HowToUse/>} />
        </Routes>
    </div>
  );
};

export default App;
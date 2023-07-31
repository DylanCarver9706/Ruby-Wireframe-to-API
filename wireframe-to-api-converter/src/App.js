import React from "react";
import { Routes, Route } from "react-router-dom";
import WireFrameMaker from "./WireFrameMaker";
import Home from "./Home";
import Navbar from "./Navbar";
import HowToUse from "./HowToUse";

const App = () => {
  return (
    <div className="App">
      {/* <WireFrameMaker/> */}
      <>
        <Navbar />
      </>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/wireframe-maker" element={<WireFrameMaker />} />
        <Route path="/how-to-use" element={<HowToUse />} />
      </Routes>
    </div>
  );
};

export default App;

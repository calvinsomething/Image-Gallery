import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
      <div>
        <div className="gallery">
          <Gallery />
        </div>
      </div>
    </>
  );
}

export default App;

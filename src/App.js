import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Login/NavBar";
import Main from "./components/Login/Main";
import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <MoralisProvider
      appId="evb5ocAQBFzDYOlCLoECmlTf85qw6b1DV4s0W6uf"
      serverUrl="https://7ckgrw7l9rev.usemoralis.com:2053/server"
    >
      <div>
        <Router>
          <NavBar />
          <Main />
        </Router>
      </div>
    </MoralisProvider>
  );
}

export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pays from "./components/Pays";
import Langues from "./components/Langues";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/pays" element={<Pays />} />
            <Route path="/langues" element={<Langues />} />
            <Route path="/" element={<Pays />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

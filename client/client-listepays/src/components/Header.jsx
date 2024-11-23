// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";  
import "../styles/Header.css"; 

const Header = () => {
  return (
    <header>
      <div className="gauche-header">
        <h1>L'Atlas du monde</h1>
        <p>Par Alexandru Ciuca et Andrei Cretu</p> 
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/pays">Pays</Link> 
          </li>
          <li>
            <Link to="/langues">Langues</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import '../styles/LandingPageStyle.css';
import logo from '../styles/logoPage.png'
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landingPageContainer">
      <div className="container">
        <header className="header">
          <div className="logo">
            <img src={logo} alt="Logo de Gourmet en Casa" />
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Info</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="content">
          <h1>Gourmet en casa</h1>
          <p>Deliciosas recetas al alcance de un click</p>
          <div className="buttons">
            <Link to="/register" className="register-link">
              <button className="register-btn">Regístrate</button>
            </Link>
            <Link to="/login" className="login-link">
              <button className="login-btn">Iniciar Sesión</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;

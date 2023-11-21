/*

import React from 'react';
import '../styles/LoginStyle.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="wrapper">
      <div className="login-container">
        <p className="login-title">¡Bienvenido de nuevo!</p>
        <p className="login-title2">Inicia sesión en Gourmet en Casa</p>
        <input type="text" className="login-input" placeholder="Apodo" />
        <input type="password" className="login-input" placeholder="Contraseña" />
        <button className="login-button" id="signin-button">SIGN IN</button>
        <Link to="/register" className="login-link">¿No tienes una cuenta? Regístrate</Link>
        <Link to="/" className="back-button">Atrás</Link>
      </div>
      <div className="image-container"></div>
    </div>
  );
}

export default Login;
*/

import React, { useState } from 'react';
import '../styles/LoginStyle.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Usuario Encontrado');
        const { token, userData } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/home');
      } else {
        alert("Error en el inicio de sesión.");
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <div className='loginContainer'>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="login-container">
          <p className="login-title">¡Bienvenido de nuevo!</p>
          <p className="login-title2">Inicia sesión en Gourmet en Casa</p>
          <input
            type="text"
            className="login-input"
            placeholder="Apodo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">SIGN IN</button>
          <Link to="/register" className="login-link">¿No tienes una cuenta? Regístrate</Link>
          <Link to="/" className="back-button">Atrás</Link>
        </form>
        <div className="image-container"></div>
      </div>
    </div>
  );
}

export default Login;

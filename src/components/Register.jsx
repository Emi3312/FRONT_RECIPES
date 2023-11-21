/*

import React, { useState } from 'react';
import '../styles/RegisterStyle.css'; 
import { Link } from 'react-router-dom';


function Register() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <div className="wrapper">
      <div className="register-container">
        <p className="register-title">¿Estás listo para lucirte en la cocina?</p>
        <p className="register-title2">Regístrate en Gourmet en Casa</p>
        <input type="text" className="register-input" placeholder="Apodo" />
        <input type="text" className="register-input" placeholder="Nombre completo" />
        <input type="email" className="register-input" placeholder="Email" />
        <input type="password" className="register-input" placeholder="Contraseña" />
        <div className="terms-container">
          <input
            type="checkbox"
            id="terms-checkbox"
            className="terms-checkbox"
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms-checkbox" className="terms-label">
            He leído y acepto los <a href="#" target="_blank">términos y condiciones</a>.
          </label>
        </div>
        <button className="register-button" disabled={!isTermsAccepted}>
          SIGN UP
        </button>
        <Link to="/login" className="register-link">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/" className="back-button">Atrás</Link>
      </div>
      <div className="image-container"></div>
    </div>
  );
}

*/


import React, { useState } from 'react';
import '../styles/RegisterStyle.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Enviar datos al servidor
    const response = await fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, fullName, email, password }),
    });

    if (response.ok) {
      alert("Usuario registrado con éxito");
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } else {
      alert("Error en el registro.");
    }
  };

  return (
    <div className='registerContainer'>
      <form onSubmit={handleSubmit} className="wrapper">
        <div className="register-container">
          <p className="register-title2">¿Estás listo para lucirte en la cocina?</p>
          <p className="register-title2">Regístrate en Gourmet en Casa</p>
          <input
            type="text"
            className="register-input"
            placeholder="Apodo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="register-input"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="terms-container">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="terms-checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms-checkbox" className="terms-label">
              He leído y acepto los <Link to="/terms" target="_blank">términos y condiciones</Link>.
            </label>
          </div>
          <button type="submit" className="register-button" disabled={!isTermsAccepted}>
            SIGN UP
          </button>
          <Link to="/login" className="register-link">¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/" className="back-button">Atrás</Link>
        </div>
        <div className="image-container2"></div>
      </form>
    </div>
  );
}

export default Register;







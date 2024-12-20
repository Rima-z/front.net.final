import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialisation du hook pour la navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5247/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Stocke le token JWT dans le localStorage
      localStorage.setItem('token', data.token);
      alert('Login successful!');

      // Redirige vers la page "Categories"
      navigate('/');
    } else {
      // Affiche un message d'erreur si le login échoue
      setError(data.message || 'Invalid credentials');
    }
  };

  return (
    <div className="ody">

    <div className="login-container">
      <h2 className="login-title">Se Connecter</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>

      {/* Lien vers la page d'inscription */}
      <div className="signup-link">
        <p>Vous n'avez pas de compte ? <a href="/signup">Inscrivez-vous ici</a></p>
      </div>
    </div>
    </div>
  );
};

export default Login;

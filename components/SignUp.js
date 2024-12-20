import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import de Link pour la navigation
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook pour naviguer

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5247/api/Auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      navigate('/login'); // Redirige vers la page de login après inscription réussie
    } else {
      setError(data);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      {/* Lien vers la page de connexion */}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Vous avez déjà un compte ?{' '}
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          Connectez-vous ici
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

// src/components/Navbar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Ajout de useLocation pour gérer les routes

const Navbar = () => {
  const location = useLocation();

  // Liste des routes où la navbar ne doit pas être affichée
  const noNavbarRoutes = ['/login', '/signup'];

  // Si la route actuelle est dans noNavbarRoutes, ne pas afficher la navbar
  if (noNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
   
    <nav style={{ backgroundColor: '#333', padding: '20px' }}>
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Partie gauche de la navbar */}
        <div style={{ display: 'flex' }}>
          <li style={{ marginRight: '20px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Accueil
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
              Panier
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
              Profil
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>
              Contact
            </Link>
          </li>
        </div>

        {/* Partie droite de la navbar */}
        <div>
          <li style={{ display: 'inline' }}>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              Se Déconnecter
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

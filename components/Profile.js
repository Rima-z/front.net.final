// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Import du fichier CSS

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Utilisateur non connecté');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5247/api/Auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur de récupération des informations');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>Votre Profil</h2>
      {user && (
        <div>
          <p>Nom d'utilisateur: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link pour la navigation
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5247/api/Categories');
        setCategories(response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        setError('Une erreur est survenue lors de la récupération des catégories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="categories-container">
      <h1>Bienvenue dans mon restaurant</h1>
      <div className="categories-list">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-link">
            <div className="category-card">
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importez useParams pour accéder aux paramètres de l'URL
import './Articles.css';
import { useCart } from './CartContext'; // Importez le context Panier

const Articles = () => {
  const { id } = useParams(); // Récupérez l'ID de la catégorie depuis l'URL
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Fonction pour ajouter un article au panier

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5247/api/Articles?categoryId=${id}`);
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des articles:', err);
        setError('Une erreur est survenue lors de la récupération des articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="articles-container">
      <h1>Articles de la catégorie</h1>
      <div className="articles-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div className="article-card" key={article.id}>
              <h2>{article.name}</h2>
              <p>Prix : {article.price} €</p>
              <p>Catégorie : {article.category.name}</p>
              {article.imageUrl && <img src={article.imageUrl} alt={article.name} className="article-image" />}
              <button className="add-to-cart" onClick={() => addToCart(article)}>
                Ajouter au panier
              </button>
            </div>
          ))
        ) : (
          <div className="no-articles">Aucun article disponible dans cette catégorie.</div>
        )}
      </div>
    </div>
  );
};

export default Articles;
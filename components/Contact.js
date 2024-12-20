import React, { useState } from 'react';
import axios from 'axios'; // Import d'axios
import './Contact.css'; // Import du fichier CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête POST vers le backend avec axios
      const response = await axios.post('http://localhost:5247/api/Contact', formData);

      // Vérification de la réponse
      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      setError('Une erreur est survenue lors de l\'envoi du message.');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      {submitted ? (
        <div className="success-message">Merci de nous avoir contactés ! Nous vous répondrons bientôt.</div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Contact;

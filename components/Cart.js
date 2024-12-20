import axios from 'axios';
import React from 'react';
import { useCart } from './CartContext';
import './Cart.css'

const Cart = () => {
  const { cartItems, setCartItems } = useCart();

  // Fonction pour diminuer la quantité ou retirer l'article
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem.quantity > 1) {
        // Si la quantité est supérieure à 1, on la diminue
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Sinon, on retire l'article du panier
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customerName: 'Nom du client',
      orderDate: new Date().toISOString(),
      totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      orderStatus: 'En cours',
      orderItems: cartItems.map((item) => ({
        articleId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await axios.post('http://localhost:5247/api/Orders', orderData);
      alert('Commande réussie !');
      setCartItems([]); // Vider le panier après la commande
    } catch (error) {
      alert(`Une erreur est survenue lors du traitement de la commande : ${error.message}`);
    }
  };

  return (
    <div className="cart-container">
      <h1>Panier</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Votre panier est vide.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
              <button onClick={() => handleRemoveFromCart(item.id)}>Retirer</button>
            </li>
          ))}
        </ul>
      )}
      <h3 className="total-price">
        Prix total : ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h3>
      <button className="checkout-button" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
        Passer la commande
      </button>
    </div>
  );
};

export default Cart;


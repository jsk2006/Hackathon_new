import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! You will receive a confirmation shortly.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/dynamic-price" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="btn-clear">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <span className="product-emoji">{item.image}</span>
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-supplier">Supplier: {item.supplier}</p>
                  <p className="cart-item-unit">Per {item.unit}</p>
                </div>
                <div className="cart-item-price">
                  <span className="price">₹{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="original-price">₹{item.originalPrice}</span>
                  )}
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal ({items.length} items):</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee:</span>
              <span>₹20</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{getCartTotal() + 20}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn-checkout"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <Link to="/dynamic-price" className="btn-continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 
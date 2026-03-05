import React from 'react';
import './cartPage.css';

const CartPage = ({ cart, onRemove, onClear, onBackToCatalog }) => {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <button onClick={onBackToCatalog} className="back-btn">Перейти в каталог</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Ваша корзина</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.cartId} className="cart-item">
              <img src={item.img_url || 'https://via.placeholder.com'} alt={item.model} />
              <div className="item-details">
                <h3>{item.brand} {item.model}</h3>
                <p>Цвет: {item.color}</p>
                <span className="item-price">{parseFloat(item.price).toLocaleString()} ₽</span>
              </div>
              <button className="remove-btn" onClick={() => onRemove(item.cartId)}>Удалить</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Итого:</h3>
          <div className="total-amount">{total.toLocaleString()} ₽</div>
          <button className="checkout-btn" onClick={() => alert('Заказ оформлен!')}>Оформить заказ</button>
          <button className="clear-btn" onClick={onClear}>Очистить корзину</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

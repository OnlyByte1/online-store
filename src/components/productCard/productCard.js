import React from 'react';
import './productCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const {
    brand,
    model,
    color,
    rating,
    price,
    old_price,
    quantity,
    img_url
  } = product;

  const currentPrice = parseFloat(price);
  const previousPrice = old_price ? parseFloat(old_price) : null;

  const discount = (previousPrice && previousPrice > currentPrice)
    ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100)
    : null;

  const imageSrc = img_url || 'https://via.placeholder.com';

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={imageSrc} alt={`${brand} ${model}`} className="product-image" />
        {discount && <span className="badge-discount">-{discount}%</span>}
        <span className="badge-count">Запас: {quantity} шт.</span>
      </div>

      <div className="info-container">
        <div className="meta-row">
          <span className="brand-label">{brand}</span>
          <div className="rating">
            <span className="star">★</span>
            <span className="rating-value">{rating}</span>
          </div>
        </div>

        <h3 className="product-title">{brand} {model}</h3>
        <p className="product-color">Цвет: {color}</p>

        <div className="footer-row">
          <div className="price-block">
            {previousPrice && <span className="old-price">{previousPrice.toLocaleString()} ₽</span>}
            <span className="current-price">{currentPrice.toLocaleString()} ₽</span>
          </div>
          <button
            className="buy-button"
            disabled={quantity === 0}
            onClick={() => onAddToCart(product)}
          >
            {quantity > 0 ? 'В корзину' : 'Нет в наличии'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

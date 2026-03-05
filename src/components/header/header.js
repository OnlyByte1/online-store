import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import { highlightText } from '../../utils/searchUtils';
import './header.css';

const Header = ({
    cartCount = 0, user = null,
    onAuthClick, onCatalogClick, onHomeClick, onCartClick, onSearchSubmit
}) => {
    const {
        searchQuery, setSearchQuery,
        searchResults, showResults, setShowResults,
        isNotFound, applySearch
    } = useSearch(onSearchSubmit);

    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="logo-header" draggable="false" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
                    <img src="/logo.svg" alt="Логотип" className="logo" draggable="false" />
                </a>

                <nav className="nav">
                    <a href="/catalog" className="nav-link" onClick={(e) => { e.preventDefault(); onCatalogClick(); }}>Каталог</a>
                </nav>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Поиск (минимум 2 символа)..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.trim().length > 1 && setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)}
                        onKeyDown={(e) => e.key === 'Enter' && applySearch(searchQuery)}
                    />
                    <button className="search-btn" onClick={() => applySearch(searchQuery)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    {showResults && (
                        <div className="search-dropdown">
                            {searchResults.length > 0 ? (
                                searchResults.map(product => (
                                    <div
                                        key={product.id}
                                        className="search-item"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            applySearch(`${product.brand} ${product.model}`);
                                        }}
                                    >
                                        <img src={product.img_url || 'https://via.placeholder.com'} alt="" />
                                        <div className="search-item-info">
                                            <div className="search-item-name">
                                                {highlightText(`${product.brand} ${product.model}`, searchQuery.trim())}
                                            </div>
                                            <div className="search-item-price">
                                                {product.price ? parseFloat(product.price).toLocaleString() : 0} ₽
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : isNotFound ? (
                                <div className="search-no-results">Ничего не найдено</div>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="actions">
                    <button className="cart-link" onClick={onCartClick}>
                        Корзина {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
                    </button>
                    <button className="auth-link" onClick={onAuthClick}>
                        {user?.name ? user.name.toUpperCase() : 'Войти'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

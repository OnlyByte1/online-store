import React, { useMemo } from 'react';
import ProductCard from '../productCard/productCard';
import { useCatalog } from '../../hooks/useCatalog';
import './catalogPage.css';

const CatalogPage = ({ onAddToCart, searchQuery, setSearchQuery }) => {
  const { products, meta, filters, setFilters, isLoading, reset } = useCatalog(searchQuery, setSearchQuery);

  const displayedProducts = useMemo(() => {
    let result = [...products];
    if (filters.minRating) {
      result = result.filter(p => parseFloat(p.rating) >= parseFloat(filters.minRating));
    }
    return result.sort((a, b) => {
      const priceA = parseFloat(a.price) || 0, priceB = parseFloat(b.price) || 0;
      if (filters.sortedBy === 'price_asc') return priceA - priceB;
      if (filters.sortedBy === 'price_desc') return priceB - priceA;
      return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    });
  }, [products, filters.minRating, filters.sortedBy]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="catalog-layout">
      <aside className="filters-sidebar">
        <h3>Фильтры</h3>
        {searchQuery && <div className="active-search-info">Результаты для: <strong>"{searchQuery}"</strong></div>}

        <FilterGroup label="Категория" name="type" value={filters.type} options={meta.types} onChange={handleFilterChange} />
        <FilterGroup label="Бренд" name="brand" value={filters.brand} options={meta.brands} onChange={handleFilterChange} />

        <div className="filter-item">
          <label>Минимальный рейтинг:</label>
          <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
            <option value="">Любой</option>
            <option value="4">4.0 ★ и выше</option>
            <option value="5">Только 5.0 ★</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Цена (₽):</label>
          <div className="price-inputs">
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="От" />
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="До" />
          </div>
        </div>

        <div className="filter-item">
          <label>Сортировка:</label>
          <select name="sortedBy" value={filters.sortedBy} onChange={handleFilterChange}>
            <option value="price_asc">Сначала дешевые</option>
            <option value="price_desc">Сначала дорогие</option>
            <option value="rating_desc">По рейтингу</option>
          </select>
        </div>

        <button className="reset-btn" onClick={reset}>Сбросить все</button>
      </aside>

      <section className="catalog-content">
        <div className="catalog-header">
          <h1 className="catalog-title">
            {searchQuery ? `Найдено: ${displayedProducts.length}` : `Каталог товаров (${displayedProducts.length})`}
          </h1>
          {isLoading && <span className="loader-text">Загрузка...</span>}
        </div>

        <div className="product-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map(item => <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} />)
          ) : (
            !isLoading && <div className="no-results-box">Ничего не найдено</div>
          )}
        </div>
      </section>
    </main>
  );
};

const FilterGroup = ({ label, name, value, options, onChange }) => (
  <div className="filter-item">
    <label>{label}:</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Все</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default CatalogPage;

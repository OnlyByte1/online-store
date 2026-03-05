import React, { useState, useEffect } from 'react';
import '../src/styles/app.css';
import { PAGES } from './constants/pages';
import { useCart } from './hooks/useCart';
import { useNotifications } from './hooks/useNotifications';

// Компоненты
import Footer from './components/footer/footer';
import Header from './components/header/header';
import AuthPage from './components/auth/auth';
import Registration from './components/registration/registration';

// Страницы
import Home from './components/home/home';
import CatalogPage from './components/catalogPage/catalogPage';
import CartPage from './components/cartpage/cartPage';
import DeliveryPage from './components/delivery/deliveryPage';
import ReturnsPage from './components/returns/returnsPage';
import HelpPage from './components/helpPage/helpPage';


function App() {
  const [user, setUser] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const { cart, addToCart, removeFromCart, clearCart, cartCount } = useCart();
  const { notification, showNotify } = useNotifications();

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('last_visited_page');
    const isAuth = saved === 'auth' || saved === 'registration';
    return isAuth ? PAGES.HOME : (saved || PAGES.HOME);
  });

  useEffect(() => {
    localStorage.setItem('last_visited_page', currentPage);
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setSearchFilter('');
    setActiveModal(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotify(`Товар "${product.brand} ${product.model}" добавлен!`);
  };

  const renderPage = () => {
    const pages = {
      [PAGES.HOME]: <Home />,
      [PAGES.CATALOG]: <CatalogPage onAddToCart={handleAddToCart} searchQuery={searchFilter} setSearchQuery={setSearchFilter} />,
      [PAGES.CART]: <CartPage cart={cart} onRemove={removeFromCart} onClear={clearCart} onBackToCatalog={() => navigateTo(PAGES.CATALOG)} />,
      [PAGES.HELP]: <HelpPage />,
      [PAGES.DELIVERY]: <DeliveryPage />,
      [PAGES.RETURNS]: <ReturnsPage />,
    };
    return pages[currentPage] || <h1>404</h1>;
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {notification && <div className="toast-notification">{notification}</div>}

      <Header
        onAuthClick={() => setActiveModal('auth')}
        onCatalogClick={() => navigateTo(PAGES.CATALOG)}
        onHomeClick={() => navigateTo(PAGES.HOME)}
        onCartClick={() => navigateTo(PAGES.CART)}
        user={user}
        cartCount={cartCount}
        onSearchSubmit={(q) => { setSearchFilter(q); setCurrentPage(PAGES.CATALOG); }}
      />

      {activeModal === 'auth' && (
        <AuthPage
          onLoginSuccess={(d) => { setUser(d); setActiveModal(null); }}
          onSwitchToRegister={() => setActiveModal('registration')}
          onBack={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'registration' && (
        <Registration
          onSwitchToLogin={() => setActiveModal('auth')}
          onBack={() => setActiveModal(null)}
        />
      )}

      <main style={{ flex: '1 0 auto' }}>{renderPage()}</main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;

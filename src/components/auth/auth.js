import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import './auth.css';

const AuthPage = ({ onLoginSuccess, onSwitchToRegister, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginUser(username, password);
      if (onLoginSuccess) onLoginSuccess(data.user);
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" onClick={onBack}>
      <form
        className="auth-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-button" onClick={onBack}>
          &times;
        </button>

        <h2>Вход в личный кабинет</h2>

        <div className="form-group">
          <label htmlFor="username">Логин:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="auth-buttons">
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Ждите...' : 'ВОЙТИ'}
          </button>

          <button
            type="button"
            className="register-link-button"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AuthPage;

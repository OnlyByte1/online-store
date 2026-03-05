import React, { useState } from 'react';
import { registerUser } from '../../services/registrationService';
import './registration.css';

const Registration = ({ onSwitchToLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await registerUser(username, password);
      setIsSuccess(true);
      setTimeout(onSwitchToLogin, 2000);
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reg-container" onClick={onBack}>
      <form className="reg-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-button" onClick={onBack}>
          &times;
        </button>

        <h2>Создать аккаунт</h2>

        {isSuccess ? (
          <div className="reg-success">Аккаунт создан! Перенаправление...</div>
        ) : (
          <>
            <div className="reg-group">
              <label>Новый логин:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="reg-group">
              <label>Новый пароль:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="reg-buttons">
              <button type="submit" className="reg-btn-main" disabled={isLoading}>
                {isLoading ? 'СОЗДАНИЕ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
              </button>

              <button
                type="button"
                className="reg-btn-back"
                onClick={onSwitchToLogin}
                disabled={isLoading}
              >
                УЖЕ ЕСТЬ АККАУНТ?
              </button>
            </div>

            {error && <p className="reg-error">{error}</p>}
          </>
        )}
      </form>
    </div>
  );
};

export default Registration;

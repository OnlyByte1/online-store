import { useState } from 'react';

export const useNotifications = () => {
  const [notification, setNotification] = useState(null);

  const showNotify = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 3000);
  };

  return { notification, showNotify };
};

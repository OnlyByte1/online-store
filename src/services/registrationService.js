const API_URL = 'http://172.16.1.254';

export const registerUser = async (username, password) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
    }

    return data;
};

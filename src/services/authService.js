const API_URL = 'http://172.16.1.252';

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'Неверный логин или пароль');
    }

    return data;
};

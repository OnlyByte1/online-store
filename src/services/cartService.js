export const getCartFromStorage = () => {
    const saved = localStorage.getItem('user_cart');
    return saved ? JSON.parse(saved) : [];
};

export const saveCartToStorage = (cart) => {
    localStorage.setItem('user_cart', JSON.stringify(cart));
};

export const addItemToCart = (cart, product) => {
    const newItem = { ...product, cartId: Date.now() + Math.random() };
    const updatedCart = [...cart, newItem];
    saveCartToStorage(updatedCart);
    return updatedCart;
};

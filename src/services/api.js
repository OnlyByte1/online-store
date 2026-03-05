const API_BASE_URL = 'http://172.16.1.254:3000/search';

export const getProducts = async (searchQuery, filters) => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (filters.type) params.append('type', filters.type);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Fetch error');
    return await response.json();
};

export const getMetadata = async () => {
    const response = await fetch(API_BASE_URL);
    return await response.json();
};

import { useState, useEffect, useCallback, useRef } from 'react';
import { getProducts, getMetadata } from '../services/api';

const INITIAL_FILTERS = {
    type: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    sortedBy: 'price_asc'
};

export const useCatalog = (searchQuery, setSearchQuery) => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({ types: [], brands: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem('catalog_filters');
        return saved ? JSON.parse(saved) : INITIAL_FILTERS;
    });

    const timer = useRef(null);

    useEffect(() => {
        if (searchQuery) setFilters(prev => ({ ...prev, type: '', brand: '' }));
    }, [searchQuery]);

    useEffect(() => {
        getMetadata().then(data => {
            if (!data?.products) return;
            setMeta({
                types: [...new Set(data.products.map(p => p.type))].filter(Boolean).sort(),
                brands: [...new Set(data.products.map(p => p.brand))].filter(Boolean).sort(),
            });
        }).catch(console.error);
    }, []);

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getProducts(searchQuery, filters);
            let productsList = data?.products || [];

            if (searchQuery) {
                const words = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

                productsList = productsList.filter(p => {
                    const fullText = `${p.brand} ${p.model} ${p.type} ${p.color}`.toLowerCase();
                    return words.every(word => fullText.includes(word));
                });
            }

            setProducts(productsList);
        } catch {
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, filters]);

    useEffect(() => {
        localStorage.setItem('catalog_filters', JSON.stringify(filters));
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(load, 400);
        return () => clearTimeout(timer.current);
    }, [filters, load]);

    const reset = () => {
        setFilters(INITIAL_FILTERS);
        localStorage.setItem('catalog_filters', JSON.stringify(INITIAL_FILTERS));
        if (setSearchQuery) {
            setSearchQuery('');
        }
    };

    return { products, meta, filters, setFilters, isLoading, reset };
};

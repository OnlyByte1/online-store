import { useState, useEffect } from 'react';

export const useSearch = (onSearchSubmit) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const applySearch = (query) => {
        const trimmed = query.trim();
        if (trimmed) {
            setSearchQuery(trimmed);
            setShowResults(false);
            if (onSearchSubmit) onSearchSubmit(trimmed);
        }
    };

    useEffect(() => {
        const fetchSearch = async () => {
            const trimmedQuery = searchQuery.trim().toLowerCase();

            if (trimmedQuery.length < 2) {
                setSearchResults([]);
                setIsNotFound(false);
                setShowResults(false);
                return;
            }

            try {
                const url = `http://172.16.1.254:3000/search?query=${encodeURIComponent(trimmedQuery)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

                const data = await response.json();

                if (data?.products) {
                    const filtered = data.products.filter(product => {
                        const fullName = `${product.brand} ${product.model}`.toLowerCase();
                        return fullName.includes(trimmedQuery);
                    });

                    if (filtered.length > 0) {
                        const sorted = filtered.sort((a, b) => {
                            const aFull = `${a.brand} ${a.model}`.toLowerCase();
                            const bFull = `${b.brand} ${b.model}`.toLowerCase();
                            return bFull.startsWith(trimmedQuery) - aFull.startsWith(trimmedQuery);
                        });
                        setSearchResults(sorted.slice(0, 5));
                        setIsNotFound(false);
                    } else {
                        setSearchResults([]);
                        setIsNotFound(true);
                    }
                }
                setShowResults(true);
            } catch (err) {
                console.error("❌ Ошибка поиска:", err);
                setIsNotFound(true);
                setShowResults(true);
            }
        };

        const timer = setTimeout(fetchSearch, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        showResults,
        setShowResults,
        isNotFound,
        applySearch
    };
};

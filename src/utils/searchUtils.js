import React from 'react';

export const highlightText = (text, query) => {
    if (!query || !text) return text;
    const parts = text.toString().split(new RegExp(`(${query})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase()
                    ? <mark key={i} className="search-highlight">{part}</mark>
                    : part
            )}
        </span>
    );
};

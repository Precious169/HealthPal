'use client';

import { useState, useEffect } from 'react';

export function useSimulation<T>(key: string, initialData: T) {
    const [data, setData] = useState<T>(initialData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem(key);
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse simulation data', e);
            }
        } else {
            sessionStorage.setItem(key, JSON.stringify(initialData));
        }
        setIsLoaded(true);
    }, [key]);

    const updateData = (newData: T | ((prev: T) => T)) => {
        setData((prev) => {
            const resolvedData = newData instanceof Function ? newData(prev) : newData;
            sessionStorage.setItem(key, JSON.stringify(resolvedData));
            return resolvedData;
        });
    };

    return { data, updateData, isLoaded };
}
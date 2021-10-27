import {useState} from 'react';

export const useFetching = (callback, onError) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            return await callback(...args)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}
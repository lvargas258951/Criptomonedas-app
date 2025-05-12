import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '@/services';
import { Cryptocurrency } from '@/models';

interface UseCryptocurrenciesResult {
  cryptocurrencies: Cryptocurrency[];
  isLoading: boolean;
  error: string | null;
  fetchMore: () => Promise<void>;
  refreshData: () => Promise<void>;
  filteredCryptocurrencies: (query: string) => Cryptocurrency[];
}

/**
 * Custom hook for fetching and managing cryptocurrency data
 */
export const useCryptocurrencies = (): UseCryptocurrenciesResult => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  // Initial data fetch
  const fetchData = useCallback(async (start: number, replace = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ApiService.getCryptocurrencies(start, limit);
      
      setCryptocurrencies((prev) => 
        replace ? data : [...prev, ...data]
      );
      
      setOffset(start + limit);
    } catch (error) {
      setError('Failed to fetch cryptocurrency data. Please try again.');
      console.error('Error in useCryptocurrencies:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchData(0, true);
  }, [fetchData]);

  // Load more data for pagination
  const fetchMore = async () => {
    if (!isLoading) {
      await fetchData(offset);
    }
  };

  // Refresh data from the beginning
  const refreshData = async () => {
    await fetchData(0, true);
  };

  // Filter cryptocurrencies based on search query
  const filteredCryptocurrencies = (query: string): Cryptocurrency[] => {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      return cryptocurrencies;
    }
    
    return cryptocurrencies.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(normalizedQuery) ||
        crypto.symbol.toLowerCase().includes(normalizedQuery)
    );
  };

  return {
    cryptocurrencies,
    isLoading,
    error,
    fetchMore,
    refreshData,
    filteredCryptocurrencies,
  };
};
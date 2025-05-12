import { useState, useEffect } from 'react';
import { ApiService } from '@/services';
import { Cryptocurrency } from '@/models';

interface UseCryptocurrencyDetailsResult {
  cryptocurrency: Cryptocurrency | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  // Mock data for chart since the API doesn't provide historical data
  chartData: number[];
}

/**
 * Custom hook for fetching and managing detailed cryptocurrency data
 */
export const useCryptocurrencyDetails = (
  id: string
): UseCryptocurrencyDetailsResult => {
  const [cryptocurrency, setCryptocurrency] = useState<Cryptocurrency | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);

  // Fetch cryptocurrency details
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ApiService.getCryptocurrencyById(id);
      setCryptocurrency(data);
      
      // Generate mock chart data since API doesn't provide historical data
      generateMockChartData(data);
    } catch (error) {
      setError('Failed to fetch cryptocurrency details. Please try again.');
      console.error('Error in useCryptocurrencyDetails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock chart data based on the current price
  const generateMockChartData = (crypto: Cryptocurrency) => {
    const basePrice = crypto.priceUsd;
    const pointCount = 24; // 24 hours
    const volatility = 0.05; // 5% maximum price movement
    const trend = crypto.percentChange24h > 0 ? 0.01 : -0.01; // Slight trend based on 24h change
    
    const data: number[] = [];
    
    for (let i = 0; i < pointCount; i++) {
      // Random fluctuation with slight trend
      const randomFactor = (Math.random() - 0.5) * 2 * volatility;
      const trendFactor = trend * i / pointCount;
      const factor = 1 + randomFactor + trendFactor;
      
      // Calculate price point
      const price = basePrice * factor;
      data.push(price);
    }
    
    setChartData(data);
  };

  // Load data on mount and when ID changes
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  // Refresh data
  const refreshData = async () => {
    await fetchData();
  };

  return {
    cryptocurrency,
    isLoading,
    error,
    refreshData,
    chartData,
  };
};
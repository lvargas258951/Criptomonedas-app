import { API } from '@/constants';
import { Cryptocurrency, GlobalData } from '@/models';

/**
 * Service responsible for handling all API calls to CoinLore
 */
export class ApiService {
  /**
   * Fetches a list of cryptocurrencies
   * @param start Starting index for pagination
   * @param limit Number of results to return
   * @returns Promise with array of Cryptocurrency instances
   */
  static async getCryptocurrencies(
    start = 0,
    limit = API.DEFAULT_LIMIT
  ): Promise<Cryptocurrency[]> {
    try {
      const response = await fetch(
        `${API.BASE_URL}${API.ENDPOINTS.TICKERS}?${API.PARAMS.START}=${start}&${API.PARAMS.LIMIT}=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.data.map((item: any) => new Cryptocurrency(item));
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      throw error;
    }
  }

  /**
   * Fetches detailed information about a specific cryptocurrency
   * @param id Cryptocurrency ID
   * @returns Promise with a Cryptocurrency instance
   */
  static async getCryptocurrencyById(id: string): Promise<Cryptocurrency> {
    try {
      const response = await fetch(
        `${API.BASE_URL}${API.ENDPOINTS.TICKER}?id=${id}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      if (!data[0]) {
        throw new Error('Cryptocurrency not found');
      }
      
      return new Cryptocurrency(data[0]);
    } catch (error) {
      console.error(`Error fetching cryptocurrency with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetches global cryptocurrency market data
   * @returns Promise with a GlobalData instance
   */
  static async getGlobalData(): Promise<GlobalData> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.GLOBAL}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return new GlobalData(data[0]);
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  }

  /**
   * Fetches markets for a specific cryptocurrency
   * @param id Cryptocurrency ID
   * @returns Promise with markets data
   */
  static async getCoinMarkets(id: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${API.BASE_URL}${API.ENDPOINTS.MARKETS}?id=${id}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching markets for coin with ID ${id}:`, error);
      throw error;
    }
  }
}
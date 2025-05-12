/**
 * Represents the global cryptocurrency market data
 * Based on CoinLore API response structure
 */
export class GlobalData {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: number;
  eth_d: number;
  mcap_change: number;
  volume_change: number;

  constructor(data: any) {
    this.coins_count = Number(data.coins_count);
    this.active_markets = Number(data.active_markets);
    this.total_mcap = Number(data.total_mcap);
    this.total_volume = Number(data.total_volume);
    this.btc_d = Number(data.btc_d);
    this.eth_d = Number(data.eth_d);
    this.mcap_change = Number(data.mcap_change);
    this.volume_change = Number(data.volume_change);
  }

  /**
   * Formats the total market cap to a readable string
   */
  get formattedTotalMarketCap(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(this.total_mcap);
  }

  /**
   * Formats the total volume to a readable string
   */
  get formattedTotalVolume(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(this.total_volume);
  }

  /**
   * Returns the market cap change with sign
   */
  get formattedMarketCapChange(): string {
    return `${this.mcap_change > 0 ? '+' : ''}${this.mcap_change.toFixed(2)}%`;
  }

  /**
   * Determines if the market cap change is positive
   */
  get isPositiveMarketCapChange(): boolean {
    return this.mcap_change > 0;
  }
}
/**
 * Represents a cryptocurrency model
 * Based on CoinLore API response structure
 */
export class Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  priceUsd: number;
  percentChange24h: number;
  percentChange1h: number;
  percentChange7d: number;
  marketCapUsd: number;
  volume24: number;
  csupply: number;
  tsupply: number | null;
  msupply: number | null;

  constructor(data: any) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.nameid = data.nameid;
    this.rank = Number(data.rank);
    this.priceUsd = Number(data.price_usd);
    this.percentChange24h = Number(data.percent_change_24h);
    this.percentChange1h = Number(data.percent_change_1h);
    this.percentChange7d = Number(data.percent_change_7d);
    this.marketCapUsd = Number(data.market_cap_usd);
    this.volume24 = Number(data.volume24);
    this.csupply = Number(data.csupply);
    this.tsupply = data.tsupply ? Number(data.tsupply) : null;
    this.msupply = data.msupply ? Number(data.msupply) : null;
  }

  /**
   * Formats the price to a USD currency string
   */
  get formattedPrice(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.priceUsd);
  }

  /**
   * Formats the market cap to a readable string with abbreviations
   */
  get formattedMarketCap(): string {
    return this.formatLargeNumber(this.marketCapUsd);
  }

  /**
   * Formats the 24h percent change to a string with % symbol
   */
  get formattedPercentChange24h(): string {
    return `${this.percentChange24h > 0 ? '+' : ''}${this.percentChange24h.toFixed(2)}%`;
  }

  /**
   * Determines if the percent change is positive
   */
  get isPositiveChange(): boolean {
    return this.percentChange24h > 0;
  }

  /**
   * Formats a large number to a readable string with abbreviations (K, M, B, T)
   */
  private formatLargeNumber(num: number): string {
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  }

  /**
   * Converts a given amount from USD to this cryptocurrency
   */
  convertFromUSD(usdAmount: number): number {
    return usdAmount / this.priceUsd;
  }

  /**
   * Converts a given amount of this cryptocurrency to USD
   */
  convertToUSD(cryptoAmount: number): number {
    return cryptoAmount * this.priceUsd;
  }
}
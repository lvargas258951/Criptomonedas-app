import { NUMBER_FORMAT } from '@/constants';

/**
 * Utility class for formatting numbers and currencies
 */
export class Formatter {
  /**
   * Formats a number as a USD currency string
   * @param value Number to format
   * @returns Formatted currency string
   */
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', NUMBER_FORMAT.USD).format(value);
  }

  /**
   * Formats a number as a percentage
   * @param value Number to format (e.g., 0.05 for 5%)
   * @returns Formatted percentage string
   */
  static formatPercent(value: number): string {
    return new Intl.NumberFormat('en-US', NUMBER_FORMAT.PERCENT).format(value / 100);
  }

  /**
   * Formats a large number with abbreviations (K, M, B, T)
   * @param value Number to format
   * @returns Formatted number string with abbreviation
   */
  static formatLargeNumber(value: number): string {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    }
    return value.toString();
  }

  /**
   * Formats a number with a + sign if positive
   * @param value Number to format
   * @param digits Number of decimal places
   * @returns Formatted number string with sign
   */
  static formatWithSign(value: number, digits = 2): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(digits)}`;
  }
}
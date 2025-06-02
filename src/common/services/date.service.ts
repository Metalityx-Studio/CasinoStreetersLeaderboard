import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateService {
  private readonly timezone: string = 'UTC';

  constructor() {
    // Set default timezone
    moment.tz.setDefault(this.timezone);
  }

  /**
   * Get current Unix timestamp in milliseconds
   * @returns number - timestamp in milliseconds (e.g., 1685433600000)
   */
  getCurrentTimestampInMs(): number {
    return moment().valueOf();
  }

  /**
   * Get current Unix timestamp in seconds
   * @returns number - timestamp in seconds (e.g., 1685433600)
   */
  getCurrentTimestampInSeconds(): number {
    return moment().unix();
  }

  /**
   * Convert Unix timestamp (in milliseconds) to formatted date string
   */
  formatTimestamp(
    timestamp: number,
    format: string = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    return moment(timestamp).format(format);
  }

  /**
   * Convert Unix timestamp (in seconds) to formatted date string
   */
  formatUnixTimestamp(
    timestamp: number,
    format: string = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    return moment.unix(timestamp).format(format);
  }

  /**
   * Get Unix timestamp in milliseconds for a specific date
   */
  getTimestampInMs(date: Date | string): number {
    return moment(date).valueOf();
  }

  /**
   * Get Unix timestamp in seconds for a specific date
   */
  getTimestampInSeconds(date: Date | string): number {
    return moment(date).unix();
  }

  /**
   * Convert milliseconds timestamp to Date object
   */
  msToDate(timestamp: number): Date {
    return moment(timestamp).toDate();
  }

  /**
   * Convert seconds timestamp to Date object
   */
  unixToDate(timestamp: number): Date {
    return moment.unix(timestamp).toDate();
  }

  /**
   * Check if timestamp is valid
   */
  isValidTimestamp(timestamp: number, isUnixSeconds: boolean = false): boolean {
    return isUnixSeconds
      ? moment.unix(timestamp).isValid()
      : moment(timestamp).isValid();
  }

  /**
   * Convert milliseconds to seconds
   */
  msToSeconds(milliseconds: number): number {
    return Math.floor(milliseconds / 1000);
  }

  /**
   * Convert seconds to milliseconds
   */
  secondsToMs(seconds: number): number {
    return seconds * 1000;
  }
}

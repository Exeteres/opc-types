/**
 * Number manipulation utilities for rounding, formatting, and shortening large numbers
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Number-API
 * @noSelf
 * @noResolution
 */
declare module "Number" {
    /**
     * Rounds a number to nearest integer
     * @param num Number to round
     * @returns Rounded integer
     */
    function round(num: number): number

    /**
     * Rounds a number to specified decimal places
     * @param num Number to round
     * @param decimalPlaces=0 Number of decimal places
     * @returns Rounded number
     */
    function roundToDecimalPlaces(num: number, decimalPlaces?: number): number

    /**
     * Gets the number of digits in a number
     * @param num Number to analyze
     * @returns Number of digits
     */
    function getDigitCount(num: number): number

    /**
     * Shortens large numbers with K, M, G, T, P, E, Z, Y suffixes
     * @param num Number to shorten
     * @param digitCount Number of decimal places to keep
     * @returns Original number if < 1000, otherwise shortened string with suffix
     */
    function shorten(num: number, digitCount?: number): string | number
}
/**
 * Bit manipulation library (Lua 5.3 compatibility shim).
 * Provides bit32 library functionality for Lua 5.3 where it's not included by default.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Bit32-API
 * @noSelf
 * @noResolution
 */
declare module "Bit32" {
    /**
     * Arithmetic right shift (sign-extending)
     * @param x Value to shift
     * @param disp Number of bits to shift
     * @returns Shifted value
     */
    function arshift(x: number, disp: number): number

    /**
     * Bitwise AND operation
     * @param values Values to AND together
     * @returns Result of AND operation
     */
    function band(...values: number[]): number

    /**
     * Bitwise NOT operation
     * @param x Value to invert
     * @returns Inverted value
     */
    function bnot(x: number): number

    /**
     * Bitwise OR operation
     * @param values Values to OR together
     * @returns Result of OR operation
     */
    function bor(...values: number[]): number

    /**
     * Tests if bitwise AND of all arguments is non-zero
     * @param values Values to test
     * @returns True if AND result is non-zero
     */
    function btest(...values: number[]): boolean

    /**
     * Bitwise XOR operation
     * @param values Values to XOR together
     * @returns Result of XOR operation
     */
    function bxor(...values: number[]): number

    /**
     * Extracts bits from a number
     * @param n Number to extract from
     * @param field Starting bit position (0-based)
     * @param width Number of bits to extract (default: 1)
     * @returns Extracted bits
     */
    function extract(n: number, field: number, width?: number): number

    /**
     * Replaces bits in a number
     * @param n Number to modify
     * @param v Value to insert
     * @param field Starting bit position
     * @param width Number of bits to replace (default: 1)
     * @returns Modified number
     */
    function replace(n: number, v: number, field: number, width?: number): number

    /**
     * Left rotate bits
     * @param x Value to rotate
     * @param disp Number of positions to rotate
     * @returns Rotated value
     */
    function lrotate(x: number, disp: number): number

    /**
     * Left shift bits
     * @param x Value to shift
     * @param disp Number of positions to shift
     * @returns Shifted value
     */
    function lshift(x: number, disp: number): number

    /**
     * Right rotate bits
     * @param x Value to rotate
     * @param disp Number of positions to rotate
     * @returns Rotated value
     */
    function rrotate(x: number, disp: number): number

    /**
     * Logical right shift (zero-filling)
     * @param x Value to shift
     * @param disp Number of positions to shift
     * @returns Shifted value
     */
    function rshift(x: number, disp: number): number
}
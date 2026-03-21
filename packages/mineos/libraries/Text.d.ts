/**
 * Text processing utilities for serialization, splitting, limiting, wrapping and Unicode operations
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Text-API
 * @noSelf
 * @noResolution
 */
declare module "Text" {
    /**
     * Serializes a table to a Lua-compatible string representation
     * @param t Table to serialize
     * @param prettyLook Whether to format with indentation and newlines
     * @param indentator=" " Indentation string
     * @param recursionStackLimit=math.huge Maximum recursion depth
     * @returns Serialized string
     */
    function serialize(
        t: any,
        prettyLook?: boolean,
        indentator?: string,
        recursionStackLimit?: number
    ): string

    /**
     * Deserializes a string to a Lua table/value
     * @param s String to deserialize
     * @returns Deserialized value or error message
     */
    function deserialize(s: string): LuaMultiReturn<[any] | [undefined, string]>

    /**
     * Splits a string by delimiter pattern
     * @param s String to split
     * @param delimiter Lua pattern to split by
     * @returns Array of split parts
     */
    function split(s: string, delimiter: string): string[]

    /**
     * Creates a braille character from 8 dot positions (0 or 1)
     * @param a Dot position 1
     * @param b Dot position 2
     * @param c Dot position 3
     * @param d Dot position 4
     * @param e Dot position 5
     * @param f Dot position 6
     * @param g Dot position 7
     * @param h Dot position 8
     * @returns Braille Unicode character
     */
    function brailleChar(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
        g: number,
        h: number
    ): string

    /**
     * Unicode-aware find function that returns character positions instead of byte positions
     * @param s String to search in
     * @param pattern Pattern to find
     * @param init Starting character position
     * @param plain Plain search without pattern matching
     * @returns Start and end character positions, or undefined if not found
     */
    function unicodeFind(
        s: string,
        pattern: string,
        init?: number,
        plain?: boolean
    ): LuaMultiReturn<[number, number] | [undefined]>

    /**
     * Limits string length with truncation and optional ellipsis
     * @param s String to limit
     * @param limit Maximum length in characters
     * @param mode Truncation mode: "left", "center", or default (right)
     * @param noDots Don't add ellipsis character (…)
     * @returns Limited string
     */
    function limit(s: string, limit: number, mode?: string, noDots?: boolean): string

    /**
     * Wraps text to specified width, breaking on word boundaries
     * @param data String or array of strings to wrap
     * @param limit Maximum line width in characters
     * @returns Array of wrapped lines
     */
    function wrap(data: string | string[], limit: number): string[]
}
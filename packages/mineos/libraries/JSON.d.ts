/**
 * JSON encoding and decoding library based on rxi's json.lua
 *
 * @noSelf
 * @noResolution
 */
declare module "JSON" {
    /**
     * Encodes a Lua value to JSON string
     * @param value Value to encode (table, string, number, boolean, null)
     * @returns JSON string representation
     */
    function encode(value: any): string

    /**
     * Decodes a JSON string to Lua value
     * @param string JSON string to decode
     * @returns Decoded Lua value
     */
    function decode<T>(string: string): T
}
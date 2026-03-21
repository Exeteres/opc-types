/**
 * Base64 encoding and decoding library
 *
 * @noSelf
 * @noResolution
 */
declare module "Base64" {
    /**
     * Encodes data to base64 string
     * @param data The data to encode
     * @returns Base64 encoded string
     */
    function encode(data: string): string

    /**
     * Decodes base64 string to data
     * @param data The base64 string to decode
     * @returns Decoded data
     */
    function decode(data: string): string
}
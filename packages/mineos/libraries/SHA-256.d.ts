/**
 * SHA-256 cryptographic hashing library
 *
 * @noSelf
 * @noResolution
 */
declare module "SHA-256" {
    /**
     * Computes SHA-256 hash of a message
     * @param string Message string to hash
     * @returns Hexadecimal hash string (64 characters)
     */
    function hash(string: string): string;
}
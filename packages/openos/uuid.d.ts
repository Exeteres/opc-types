/**
 * The uuid API is a very simple library for creating 128 bit random identifiers.
 * @see https://ocdoc.cil.li/api:uuid
 * @noSelf
 * @noResolution
 */
declare module "uuid" {
    /**
     * Returns 128 bit random identifiers, represented as a hex value in a string
     * grouped by 8, 4, 4, 4, and 12 hex characters, separated by dashes.
     */
    function next(): string;
}

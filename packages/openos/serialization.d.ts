/**
 * This module provides simple value serialization.
 * @see https://ocdoc.cil.li/api:serialization
 * @noSelf
 * @noResolution
 */
declare module "serialization" {
    /**
     * Generates a string from an object that can be parsed again using `serialization.unserialize`.
     * The `pretty` mode can be used to generate output for display to the user.
     */
    function serialize(value: any, pretty?: boolean | number): string;

    /**
     * Restores an object previously saved with `serialization.serialize`.
     */
    function unserialize<T = any>(value: string): T;
}

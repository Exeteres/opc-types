/**
 * Enhanced component library with convenience methods.
 * Extends the base OpenComputers component API with simpler access patterns.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Component-API
 * @noSelf
 * @noResolution
 */
declare module "Component" {
    /**
     * Gets first available component proxy of specified type
     * @param type Component type (e.g., "gpu", "screen", "filesystem")
     * @returns Component proxy or error message
     */
    function get(type: string): LuaMultiReturn<[any] | [undefined, string]>;

    /**
     * Checks if a component type is available in the system
     * @param type Component type to check
     * @returns True if at least one component of this type exists
     */
    function isAvailable(type: string): boolean;
}
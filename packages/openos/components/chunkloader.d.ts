/**
 * This component is provided by the chunkloader upgrade.
 * @see https://ocdoc.cil.li/component:chunkloader
 * @noSelf
 */
declare interface Chunkloader {
    /**
     * Returns whether the chunkloader is currently active.
     */
    isActive(): boolean;

    /**
     * Enables or disables the chunkloader.
     * Returns the new state, which may be false if no chunk loading ticket could be acquired.
     */
    setActive(enabled: boolean): boolean;
}

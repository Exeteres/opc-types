declare namespace OpenSecurity {
    /**
     * Controls nanofog for concealment.
     * Provides area of effect fog/invisibility
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/NanoFogTerminal
     * @noSelf
     * @noResolution
     */
    interface NanoFogTerminal {
        /**
         * Activates the nanofog
         */
        activate(): void

        /**
         * Deactivates the nanofog
         */
        deactivate(): void

        /**
         * Checks if nanofog is active
         * @returns True if active
         */
        isActive(): boolean

        /**
         * Sets the nanofog range
         * @param range Range in blocks
         */
        setRange(range: number): void

        /**
         * Gets the current range
         * @returns Current range
         */
        getRange(): number
    }
}

declare namespace OpenLight {
    /**
     * Adds a configurable colored lamp.
     *
     * @see https://github.com/PC-Logix/OpenLights/wiki
     * @noSelf
     * @noResolution
     */
    interface Light {
        /**
         * Sets the light color
         * @param color Color as hexadecimal number
         */
        setColor(color: number): void

        /**
         * Sets the brightness of the light
         * @param brightness Brightness value between 0 and 15
         */
        setBrightness(brightness: number): void

        /**
         * Gets the current color, which can be converted to int with `tonumber(value, 16)`
         * @returns The current color as hexadecimal string
         */
        getColorString(): string

        /**
         * Returns the current brightness value
         * @returns The current brightness value between 0 and 15
         */
        getBrightness(): number
    }
}

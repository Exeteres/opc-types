declare namespace OpenOS {
    /**
     * This component is provided by the access point to allow computers
     * to change the strength of the signal used to relay wireless messages.
     * @see https://ocdoc.cil.li/component:access_point
     * @noSelf
     */
    interface AccessPoint {
        /**
         * Get the signal strength (range) used when relaying messages.
         */
        getStrength(): number;

        /**
         * Set the signal strength (range) used when relaying messages.
         */
        setStrength(strength: number): number;

        /**
         * Check whether Access Point is acting as a repeater (re-send received wireless messages).
         */
        isRepeater(): boolean;

        /**
         * Sets whether Access Point should act as a repeater (re-send received wireless messages).
         */
        setRepeater(enabled: boolean): boolean;
    }
}

declare namespace OpenSecurity {
    /**
     * Reads Magnetic Cards when right-clicked.
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/MagneticCardReader
     * @noSelf
     * @noResolution
     */
    interface MagneticCardReader {
        /**
         * Changes the event name triggered when reader is used
         * @param eventName=magdata New event name
         */
        setEventName(eventName: string): void

        /**
         * Enables/disables automatic lights on the reader.
         * If true, it will function as it normally does when clicked with a card.
         * If false, you have to call setLightState to change the lights on the magreader
         * @param enableLights Enable automatic light switching
         */
        swipeIndicator(enableLights: boolean): void

        /**
         * Sets the light state of the reader.
         * @param lightState A number from 0 to 7
         */
        setLightState(lightState: number): void
    }
}
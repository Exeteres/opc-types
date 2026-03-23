declare namespace OpenSecurity {
    /**
     * Sends event when used by a player.
     * Scans player UUID when used
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/BiometricReader
     * @noSelf
     * @noResolution
     */
    interface BiometricReader {
        /**
         * Changes the event name triggered when reader is used
         * @param name=bioReader New event name
         */
        setEventName(name: string): void
    }
}
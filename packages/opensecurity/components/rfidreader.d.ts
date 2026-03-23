declare namespace OpenSecurity {
    /**
     * Reads RFID cards.
     * Triggers events when cards are scanned
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/RFID_reader
     * @noSelf
     * @noResolution
     */
    interface RFIDReader {
        /**
         * Sets the event name triggered when card is scanned
         * @param name=rfidData Event name
         */
        setEventName(name: string): void

        /**
         * Sets the scan range
         * @param range Range in blocks
         */
        setRange(range: number): void

        /**
         * Gets the current scan range
         * @returns Current range
         */
        getRange(): number
    }
}
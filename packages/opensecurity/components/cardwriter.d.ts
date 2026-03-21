declare namespace OpenSecurity {
    /**
     * Writes data to RFID cards, Magnetic cards, and EEPROMs
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/CardWriter
     * @noSelf
     * @noResolution
     */
    interface CardWriter {
        /**
         * Writes data to a magnetic/RFID card
         * @param data Data to write
         * @param displayName Display name for the card
         * @param locked Set to true to make card read-only
         * @param color Optional color code for the card
         */
        write(data: string, displayName: string, locked?: boolean, color?: number): void

        /**
         * Flashes data to an EEPROM
         * @param data Data to write
         * @param title EEPROM title
         * @param writelock Lock EEPROM from further writing
         */
        flash(data: string, title: string, writelock: boolean): void
    }
}
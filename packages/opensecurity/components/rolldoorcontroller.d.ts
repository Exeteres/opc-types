declare namespace OpenSecurity {
    /**
     * Controls rolldoors.
     * Similar to Door Controller but specifically for rolldoors
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/RolldoorController
     * @noSelf
     * @noResolution
     */
    interface RolldoorController {
        /**
         * Opens the rolldoor
         */
        open(): void

        /**
         * Closes the rolldoor
         */
        close(): void

        /**
         * Toggles the rolldoor state
         */
        toggle(): void

        /**
         * Checks if rolldoor is open
         * @returns True if open
         */
        isOpen(): boolean
    }
}
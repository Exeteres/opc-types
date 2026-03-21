declare namespace OpenSecurity {
    /**
     * Operates Security Doors and normal Doors.
     * Can only be broken by creative mode or the person who placed it.
     * Can be camouflaged by right-clicking with a solid block.
     * Can be used as an upgrade for Microcontrollers
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/DoorController
     * @noSelf
     * @noResolution
     */
    interface DoorController {
        /**
         * Opens or closes the door (toggles state)
         * @param password Door password
         * @returns Array containing return value for each connected door
         */
        toggle(password: string): any[]

        /**
         * Checks if the door is open
         * @returns True if a door is open
         */
        isOpen(): boolean

        /**
         * Opens the door
         * @param password Door password
         * @returns Array containing return value for each connected door
         */
        open(password: string): any[]

        /**
         * Closes the door
         * @param password Door password
         * @returns Array containing return value for each connected door
         */
        close(password: string): any[]

        /**
         * Changes the door password
         * @param oldPassword Current password
         * @param newPassword New password
         * @returns Array containing return value for each connected door
         */
        setPassword(oldPassword: string, newPassword: string): any[]

        /**
         * Removes the door password
         * @param password Current password
         * @returns Array containing return value for each connected door
         */
        removePassword(password: string): any[]
    }
}
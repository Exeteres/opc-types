declare namespace OpenSecurity {
    /**
     * Protects blocks in an area from unauthorized mining.
     * Requires password for enable/disable and user management
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/SecurityTerminal
     * @noSelf
     * @noResolution
     */
    interface SecurityTerminal {
        /**
         * Checks if the terminal is enabled
         * @returns True if enabled
         */
        isEnabled(): boolean

        /**
         * Adds a user as authorized
         * @param password Terminal password
         * @param username Minecraft username to add
         * @returns Success status
         */
        addUser(password: string, username: string): boolean

        /**
         * Removes an authorized user
         * @param username Minecraft username to remove
         * @returns Success status
         */
        delUser(username: string): boolean

        /**
         * Sets the terminal password.
         * Required for enable/disable and other actions
         * @param password New password
         * @returns Success status
         */
        setPassword(password: string): boolean

        /**
         * Toggles particles showing the protected area corners
         * @returns Success status
         */
        toggleParticle(): boolean

        /**
         * Sets the range of the protection area.
         * 8 blocks multiply Range
         * Increasing range increases energy cost
         * @param range Protection range (1 to 4)
         * @returns Success status
         */
        setRange(range: number): boolean
    }
}
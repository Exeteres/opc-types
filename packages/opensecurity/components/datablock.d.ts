declare namespace OpenSecurity {
    /**
     * Stores and manages user access data
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/DataBlock
     * @noSelf
     * @noResolution
     */
    interface DataBlock {
        /**
         * Gets the maximum number of users that can be stored
         * @returns Maximum user count
         */
        getMaxUserCount(): number

        /**
         * Sets the maximum number of users that can be stored
         * @param count Maximum user count
         */
        setMaxUserCount(count: number): void

        /**
         * Adds a user to the data block
         * @param username Username to add
         * @returns Success status
         */
        addUser(username: string): boolean

        /**
         * Removes a user from the data block
         * @param username Username to remove
         * @returns Success status
         */
        removeUser(username: string): boolean

        /**
         * Checks if a user exists in the data block
         * @param username Username to check
         * @returns True if user exists
         */
        hasUser(username: string): boolean

        /**
         * Gets a list of all users
         * @returns Array of usernames
         */
        getUsers(): string[]
    }
}
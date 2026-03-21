declare namespace OpenSecurity {
    /**
     * Plays configurable alarm sounds.
     * Can be computer or redstone controlled.
     * Can be used as an upgrade for Drones/Microcontrollers/Robots/Tablets
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/Alarm
     * @noSelf
     * @noResolution
     */
    interface Alarm {
        /**
         * Changes the alarm sound played
         * Default sounds are "klaxon1" and "klaxon2"
         * Custom sounds can be placed in minecraft/mods/OpenSecurity/assets/opensecurity/sounds/alarms
         * @param sound Name of the alarm sound (without .ogg extension)
         */
        setAlarm(sound: string): void

        /**
         * Sets the range in blocks from the alarm block
         * @param range Range in blocks (0 to 15)
         */
        setRange(range: number): void

        /**
         * Activates the alarm
         */
        activate(): void

        /**
         * Deactivates the alarm
         */
        deactivate(): void

        /**
         * Returns a table of configured alarm sounds
         * @returns Array of available alarm sound names
         */
        listSounds(): string[]
    }
}

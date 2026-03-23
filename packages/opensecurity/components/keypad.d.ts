declare namespace OpenSecurity {
    /**
     * Button pad for entering codes.
     * Raises events when buttons are pressed.
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/Keypad
     * @noSelf
     * @noResolution
     */
    interface Keypad {
        /**
         * Sets the event name triggered when buttons are pressed
         * @param name Event name (default: "keypad")
         */
        setEventName(name: string): void

        /**
         * Sets the display text and color
         * @param text Display text
         * @param color Minecraft color code
         */
        setDisplay(text: string, color?: number): void

        /**
         * Sets the keypad beep volume
         * @param volume Volume level (0.0 to 1.0)
         */
        setVolume(volume: number): void

        /**
         * Gets the current keypad beep volume
         * @returns Current volume
         */
        getVolume(): number

        /**
         * Sets custom button labels and colors.
         *
         * Default order: `["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]`
         * @param labels Array of 12 button labels
         * @param colors Array of 12 Minecraft color codes
         */
        setKey(labels: string[], colors: number[]): void
    }
}
declare namespace OC.Components {
    /**
     * Computers provide a couple of API callbacks.
     * Note that these can only be called by the computer itself, or its direct neighbors
     * (i.e. other computers that share a face with that computer).
     * Also note that since robots cannot interact with external components they cannot start/stop/query computers,
     * but computers can interact with robots sitting next to them.
     * @see https://ocdoc.cil.li/component:computer
     * @noSelf
     */
    interface Computer {
        /**
         * Tries to start the computer.
         * Returns true on success, false otherwise.
         * Note that this will also return false if the computer was already running.
         * If the computer is currently shutting down, this will cause the computer to reboot instead.
         */
        start(): boolean;

        /**
         * Tries to stop the computer.
         * Returns true on success, false otherwise.
         * Also returns false if the computer is already stopped.
         */
        stop(): boolean;

        /**
         * Returns whether the computer is currently running.
         */
        isRunning(): boolean;

        /**
         * Plays a tone, useful to alert users via audible feedback.
         * Supports frequencies from 20 to 2000Hz, with a duration of up to 5 seconds.
         */
        beep(frequency?: number, duration?: number): void;
    }
}

declare namespace OpenSecurity {
    /**
     * Defensive turret that can be controlled programmatically.
     * Requires power and various configuration before firing.
     * Can be upgraded with cooldown, damage, energy, and movement upgrades
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/EnergyTurret
     * @noSelf
     * @noResolution
     */
    interface EnergyTurret {
        /**
         * Turns the turret on (must be powered before other commands)
         */
        powerOn(): void

        /**
         * Turns the turret off
         */
        powerOff(): void

        /**
         * Checks if turret is ready to fire
         * @returns True if cooled down, armed, and barrel is valid
         */
        isReady(): boolean

        /**
         * Checks if turret is powered on
         * @returns True if powered
         */
        isPowered(): boolean

        /**
         * Arms or disarms the turret (must be armed to fire)
         * @param armed True to arm, false to disarm
         */
        setArmed(armed: boolean): void

        /**
         * Extends or retracts the rotator shaft.
         * Must be at least 1 to fire
         * @param length Shaft length (0 to 2)
         */
        extendShaft(length: number): void

        /**
         * Gets the current shaft length
         * @returns Current shaft length
         */
        getShaftLength(): number

        /**
         * Moves the turret to specified rotation in radians
         * @param horizontal Horizontal rotation in radians
         * @param vertical Vertical rotation in radians
         */
        moveToRadians(horizontal: number, vertical: number): void

        /**
         * Moves the turret to a specified rotation in degrees.
         * Uses shortest rotation path
         * @param horizontal Horizontal rotation (0 to 360 degrees)
         * @param vertical Vertical rotation (-45 to 90 degrees)
         */
        moveTo(horizontal: number, vertical: number): void

        /**
         * Checks if turret has reached target position
         * @returns True if on target
         */
        isOnTarget(): boolean

        /**
         * Fires the turret
         * @returns Success status and optional error message
         */
        fire(): LuaMultiReturn<[true]> | LuaMultiReturn<[false, string]>
    }
}
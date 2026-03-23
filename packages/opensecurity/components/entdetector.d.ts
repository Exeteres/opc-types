declare namespace OpenSecurity {
    /**
     * Detects entities around the block.
     * Can be used as an upgrade for Drones/Microcontrollers/Robots/Tablets
     *
     * @see https://github.com/PC-Logix/OpenSecurity/wiki/EntityDetector
     * @noSelf
     * @noResolution
     */
    interface EntityDetector {
        /**
         * Scans for players in range.
         * Triggers `entityDetect` event for each player
         * @param range Scan range (1-64 blocks, default varies)
         * @returns Table of detected players
         */
        scanPlayers(range?: number): LuaTable<number, any>

        /**
         * Scans for entities in range (omits players, includes dropped items).
         * Triggers `entityDetect` event for each entity
         * @param range Scan range (1-64 blocks, default varies)
         * @returns Table of detected entities
         */
        scanEntities(range?: number): LuaTable<number, any>
    }
}
declare namespace OC.Components {
    /**
     * This component is provided by the geolyzer block.
     * @see https://ocdoc.cil.li/component:geolyzer
     * @noSelf
     */
    interface Geolyzer {
        /**
         * Analyzes the density of the column at the specified relative coordinates.
         * This will return a list of hardness values for the blocks in the specified range.
         * The coordinates are relative to the location of the geolyzer.
         * Hardness values for blocks further away from the geolyzer are more noisy than those for blocks nearby.
         * Note that the values returned is always 64 values, even if the scan volume is only part of that.
         * If 10 blocks are scanned, the first 10 values in the result represent those blocks scanned.
         * The remaining values in the result should be ignored.
         */
        scan(
            x: number,
            z: number,
            y?: number,
            w?: number,
            d?: number,
            h?: number,
            ignoreReplaceable?: boolean,
            options?: any
        ): any;

        /**
         * Get some information on a directly adjacent block.
         * By default the returned table returns the string ID of the block
         * (e.g. minecraft:dirt, metadata, hardness and some more information).
         * Note that a single call to this consumes the same amount of energy a call to scan does!
         * This method can be disabled with the misc.allowItemStackInspection setting in the config.
         */
        analyze(side: number, options: any): any;

        /**
         * Stores an item stack representation of the block on the specified
         * side of the geolyzer to the specified slot of a database component with the specified address.
         * Do not expect this to work (well) for every block in existence,
         * in particular not for mod's blocks that are differentiated by NBT data (such as robots).
         */
        store(side: number, dbAddress: string, dbSlot: number): boolean;
    }
}

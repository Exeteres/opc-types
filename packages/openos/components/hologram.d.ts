declare namespace OpenOS {
    /**
     * This component is provided by the Hologram Projector.
     * These can be used to create holographic projections in a resolution of 48x32x48, over a maximum area of 9x6x9 blocks.
     * Tier two holograms do not provide a higher resolution,
     * instead they allow using up to three colors in the displayed hologram (as opposed to just one for the tier one hologram).
     * @see https://ocdoc.cil.li/component:hologram
     * @noSelf
     */
    interface Hologram {
        /**
         * Clears the hologram.
         */
        clear(): void;

        /**
         * Returns the value at the specified position.
         */
        get(x: number, y: number, z: number): number;

        /**
         * Set the value for the specified position.
         */
        set(x: number, y: number, z: number, value: number | boolean): void;

        /**
         * Fills an interval in the specified column column with the specified value.
         * Will overwrite only the voxels in the interval.
         * If minY is omitted it defaults to 1. The two interval ends are inclusive.
         * Note: Before 1.3.3 there was no minY argument and all voxels below and
         * including the specified height would be set, all voxels above would be unset.
         */
        fill(
            x: number,
            z: number,
            minY?: number,
            maxY?: number,
            value?: number
        ): void;

        /**
         * Copies an area of columns by the specified translation.
         */
        copy(
            x: number,
            z: number,
            sx: number,
            sz: number,
            tx: number,
            tz: number
        ): void;

        /**
         * Returns the current render scale of the hologram.
         */
        getScale(): number;

        /**
         * Set the render scale. A larger scale consumes more energy.
         * The minimum scale is 0.33, where the hologram will fit in a single block space,
         * the maximum scale is 3, where the hologram will take up a 9x6x9 block space.
         * getTranslation:number, number, number Return the current translation offset.
         */
        setScale(value: number): void;

        /**
         * Set the translation vector.
         * The hologram display will be offset by this vector from its normal location.
         * The maximum allowable translation is a function of tier.
         * Units are the hologram's size, so the distance translated increases and decreases with scale as well.
         */
        setTranslation(x: number, y: number, z: number): void;

        /**
         * The color depth supported by the hologram.
         */
        maxDepth(): number;

        /**
         * Get the hex color defined for the specified value.
         */
        getPaletteColor(index: number): number;

        /**
         * Set the hex color defined for the specified value.
         */
        setPaletteColor(index: number, value: number): number;
    }
}

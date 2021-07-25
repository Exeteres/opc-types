declare namespace OC.Components {
    /**
     * This component is provided by Floppy Disks or Hard Disk Drives in Unmanaged mode (for Managed mode, see Filesystem)
     * To switch a managed drive to Unmanaged mode, just right click with the item in your hand and select Unmanaged mode
     * (Warning: this will wipe the drive).
     * @see https://ocdoc.cil.li/component:drive
     * @noSelf
     */
    interface Drive {
        /**
         * Read a single byte at the specified offset.
         */
        readByte(offset: number): number;

        /**
         * Write a single byte to the specified offset.
         */
        writeByte(offset: number, value: number): void;

        /**
         * Returns the size of a single sector on the drive, in bytes.
         */
        getSectorSize(): number;

        /**
         * Get the current label of the drive.
         */
        getLabel(): string;

        /**
         * Sets the label of the drive.
         * Returns the new value, which may be truncated.
         */
        setLabel(value: string): string;

        /**
         * Read the current contents of the specified sector.
         */
        readSector(sector: number): string;

        /**
         * Write the specified contents to the specified sector.
         */
        writeSector(sector: number, value: string): void;

        /**
         * Returns the number of platters in the drive.
         */
        getPlatterCount(): number;

        /**
         * Returns the total capacity of the drive, in bytes.
         */
        getCapacity(): number;
    }
}

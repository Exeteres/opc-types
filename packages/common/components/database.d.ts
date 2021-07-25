declare namespace OC.Components {
    /**
     * The database component is primarily useful to work with “full” item stacks,
     * including NBT tags, which are (by default) not available to Lua scripts
     * (to avoid exploits / breaking of other mods' gameplay).
     * Some components allow specifying item stacks by instead specifying the address of a database component,
     * and slot the item stack is in that database - for example,
     * the Export Bus driver for Applied Energistics 2 makes use of this functionality.
     * @see https://ocdoc.cil.li/component:database
     * @noSelf
     */
    interface Database {
        /**
         * Get the representation of the item stack stored in the specified slot.
         */
        get(slot: number): any;

        /**
         * Computes a hash value for the item stack in the specified slot.
         * This value is guaranteed to be the same for identical item stacks,
         * allowing comparison of item stacks across a network (by comparing the hash values).
         */
        computeHash(slot: number): string;

        /**
         * Get the index of an item stack with the specified hash.
         * Returns a negative value if no such stack was found.
         */
        indexOf(hash: string): number;

        /**
         * Clears the specified slot.
         * Returns true if there was something in the slot before.
         */
        clear(slot: number): boolean;

        /**
         * Copies an entry to another slot, optionally to another database.
         * Returns true if something was overwritten.
         */
        copy(fromSlot: number, toSlot: number, address?: string): boolean;

        /**
         * Copies the data stored in this database to another database with the specified address.
         */
        clone(address: string): number;
    }
}

declare namespace OC.Components {
    /**
     * This component represents an inventory controller.
     * @see https://ocdoc.cil.li/component:inventory_controller
     * @noSelf
     */
    interface InventoryController {
        /**
         * Get the size of the inventory at the specified side.
         * @returns the size of the inventory, or null followed by a description why this function failed (usually no inventory).
         */
        getInventorySize(side: number): LuaMultiReturn<[number] | [boolean, string]>;

        /**
         * Get a table describing the item in the specified slot or nil. Deprecated for getting info about robot's own inventory, see getStackInInternalSlot.
         * @returns: null if the slot was empty (or outside the inventory's bounds), @see ItemStack otherwise with the following information about the item in that slot:
         */
        getStackInSlot(side: number, slot: number): ItemStack;

        /**
         * Gets Itemstack description of item in specified or selected slot (if no input provided) of robot inventory.
         */
        getStackInInternalSlot(slot: number): ItemStack;

        /**
         * Puts up to count items from the currently selected slot into the specified slot of the inventory at the specified side.
         * Note that the robot cannot drop items into it's own inventory, attempting to do so will cause this to throw an error. You need to use robot.transferTo from the Robot API to do so.
         * @returns true if at least one item was moved, false and a secondary result that describes the error otherwise.
         */
        dropIntoSlot(side: number, slot: number, count: number | null): [boolean, string?];

        /**
         * Takes up to count items from the specified slot of the inventory at the specified side and puts them into the currently selected slot.
         * If the currently selected slot is occupied, then the items will be stacked with similar items in the robot's inventory or moved to the next free slot if available. If no slot is available this operation will fail.
         * Note that the robot cannot suck items from it's own inventory, attempting to do so will cause this to throw an error. You need to use robot.transferTo from the Robot API to do so.
         * @returns true if at least one item was moved, false otherwise.
         */
        suckFromSlot(side: number, slot: number, count: number | null): boolean;

        /**
         * Swaps the content of the robot's tool slot with the content of the currently selected inventory slot.
         * Note that you can put any kind of item into the robot's tool slot, not only tools, even items that the robot cannot use at all.
         * @returns: true if the items were swapped, false otherwise. This operation usually succeeds.
         */
        equip(): boolean;

        /**
         * Stores the Itemstack description of the item from the specified slot in an inventory on the specified side, into a specified database slot with the specified address.
         */
        store(side: number, slot: number, dbAddress: string, dbSlot: number): boolean;

        /**
         * Stores Itemstack description of item in specified robot inventory slot into specified database slot with the specified database address.
         */
        storeInternal(slot: number, dbAddress: string, dBslot: number): boolean;

        /**
         * Stores Itemstack description of item in specified robot inventory slot into specified database slot with the specified database address.
         * @returns true if items match.
         */
        compareToDatabase(slot: number, dBaddress: string, dBslot: number): boolean;

        /**
         * Checks to see if Itemstack descriptions in specified slotA and slotB of inventory on specified side match.
         * @returns true if identical.
         */
        compareStacks(side: number, slotA: number, slotB: number): boolean;

        /**
         * Gets maximum number of items in specified slot in inventory on the specified side.
         */
        getSlotMaxStackSize(side: number, slot: number): number;

        /**
         * Gets number of items in specified slot in inventory on the specified side.
         */
        getSlotStackSize(side: number, slot: number): number;
    }

    interface ItemStack {
        damage: number;
        maxDamage: number;
        size: number;
        maxSize: number;
        id: number;
        name: string;
        label: string;
        hasTag: boolean;
    }
}

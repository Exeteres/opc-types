/**
 * This API wraps the functionality of the component robot to allow more intuitive interaction with the robot.
 * @see https://ocdoc.cil.li/api:robot
 * @noSelf
 * @noResolution
 */
declare module "robot" {
    /**
     * Returns the robot's name.
     */
    function name(): string;

    /**
     * Detects what is directly in front of the robot and returns if the robot could move through it as well as a generic description.
     * @returns `true` if the robot if whatever is in front of the robot would prevent him from moving forward (a block or an entity)
     * (Note: Drones return `true` even if the block is passable), `false` otherwise.
     * The second parameter describes what is in front in general and
     * is one of either `entity`, `solid`, `replaceable`, `liquid`, `passable` or `air`.
     * @tupleReturn
     */
    function detect(): [boolean, string];

    /**
     * As `robot.detect()` except that it scans the block directly above the robot.
     * @tupleReturn
     */
    function detectUp(): [boolean, string];

    /**
     * As `robot.detect()` except that it scans the block directly belove the robot.
     * @tupleReturn
     */
    function detectDown(): [boolean, string];

    /**
     * Selects the given inventory slot (if specified) and returns the current inventory slot.
     * @param slot - The slot to select.
     * If this parameter is omitted, no slot is selected.
     * @returns The currently selected slot. Either the one specified (if successfully selected)
     * or the one that was previously selected.
     */
    function select(slot?: number): number;

    /**
     * @returns The amount of select-able internal robot inventory slots.
     * To get the number of inventory upgrade use: x = robot.inventorySize() / 16.
     */
    function inventorySize(): number;

    /**
     * @param slot - Specifies the slot to count the items in.
     * If omitted the currently selected slot is counted instead.
     * @returns The amount of items in the slot specified or the currently selected slot if no slot was given.
     */
    function count(slot?: number): number;

    /**
     * This function helps to determine how many items of a type can be added to a specific slot.
     * While for example cobblestone can pile up to 64 items per slot,
     * empty buckets can only stack up to 16 and other blocks like doors can only take 1 item per slot.
     * @param slot - Specifies the slot to count the items in.
     * If omitted the currently selected slot is counted instead.
     * @returns The amount of items that can still be added to the the slot specified
     * or the currently selected slot until it is considered full.
     */
    function space(slot?: number): number;

    /**
     * Moves all or up to count items from the currently selected slot to the specified slot.
     * @param slot - Specifies the slot move the items from the currently selected slot to.
     * @param count - If specified only up to this many items are moved, otherwise the entire stack is moved.
     * @returns `true` if exchanging the content between those slots was successful, `false` otherwise.
     * If there are items in the target slot then this function attempts to swap the items in those slots.
     */
    function transferTo(slot: number, count?: number): boolean;

    /**
     * Compares the item of the currently selected slot to the item of the slot specified and returns whether they are equal or not.
     * @param slot - Specifies the slot to compare the current slot to.
     * @returns `true` if the item type in the specified slot and the currently selected slot are equal, `false` otherwise.
     * Two items are considered the 'same' if their item type and metadata are the same.
     * Stack size or any additional mod-specific item informations (like for example the content of two floppy disks) are not checked.
     */
    function compareTo(slot: number): boolean;

    /**
     * Compares the block in front of the robot with the item in the currently selected slot.
     * Blocks are considered the 'same' if their type and metadata are the same.
     * Stack size or any additional informations (like for example the inventory of a container) are not checked.
     * @returns Whether they are the same or not.
     */
    function compare(): boolean;

    /**
     * As `robot.compare` just for the block directly above the robot.
     */
    function compareUp(): boolean;

    /**
     * As `robot.compare` just for the block directly below the robot.
     */
    function compareDown(): boolean;

    /**
     * Tries to drop items from the currently selected inventory slot in front of the robot.
     * Note that if you are trying to drop items into an inventory below you, this is the wrong method.
     * @param count - Specifies how many items to drop.
     * If omitted or if count exceeds the amount of items in the currently selected slot,
     * then all items in the currently selected slot are dropped.
     * @returns `true` if at least one item was dropped, `false` otherwise.
     */
    function drop(count?: number): boolean;

    /**
     * As `robot.drop` just for the block directly above the robot.
     */
    function dropUp(): boolean;

    /**
     * As `robot.drop` just for the block directly below the robot.
     */
    function dropDown(): boolean;

    /**
     * Tries to pick up items from directly in front of the robot and puts it into the selected slot or (if occupied) first possible slot.
     * @param count - Limits the amount of items to pick up by this many.
     * If omitted a maximum of one stack is taken.
     * @return `true` if at least one item was picked up, `false` otherwise.
     */
    function suck(count?: number): boolean;

    /**
     * As `robot.suck` except that it tries to pick up items from directly above the robot.
     */
    function suckUp(count?: number): boolean;

    /**
     * As `robot.suck` except that it tries to pick up items from directly below the robot.
     */
    function suckDown(count?: number): boolean;

    /**
     * Tries to place the block in the currently selected inventory slot in front of the robot.
     * @param side - If specified this determines the surface on which the robot attempts to place the block for example to place torches to a specific side.
     * If omitted the robot will try all possible sides.
     * See the Sides API for a list of possible sides.
     * @param sneaky - If set to true the robot will simulate a sneak-placement (like if the player would be using shift during placement),
     * which is usually not necessary and only included for compatibility to other mods.
     * @returns `true` if an item could be placed, `false` otherwise.
     * If placement failed, the secondary return parameter will describe why the placement failed.
     * @tupleReturn
     */
    function place(side?: number, sneaky?: boolean): [boolean, string?];

    /**
     * As `robot.place` except that the robot tries to place the item into the space directly above it.
     * @tupleReturn
     */
    function placeUp(side?: number, sneaky?: boolean): [boolean, string?];

    /**
     * As `robot.place` except that the robot tries to place the item into the space directly below it.
     * @tupleReturn
     */
    function placeDown(side?: number, sneaky?: boolean): [boolean, string?];

    /**
     * @returns The durability of the item currently in the tool slot, followed by its current durability, followed by its maximum durability.
     * If no item is equipped or the item has no durability this returns nil and an error message describing why no durability could be returned.
     * @tupleReturn
     */
    function durability(): [number, number, number | null, string];

    /**
     *
     * @param side - If given the robot will try to 'left-click' only on the surface as specified by side,
     * otherwise the robot will try all possible sides.
     * See the Sides API for a list of possible sides.
     * @returns `true` if the robot could interact with the block or entity in front of it, `false` otherwise.
     * If successful the secondary parameter describes what the robot interacted with and will be one of `entity`, `block` or `fire`.
     * @tupleReturn
     */
    function swing(side?: number, sneaky?: boolean): [boolean, string];

    /**
     * As `robot.swing` except that the block or entity directly above the robot will be the target.
     * @tupleReturn
     */
    function swingUp(side?: number, sneaky?: boolean): [boolean, string];

    /**
     * As `robot.swing` except that the block or entity directly below the robot will be the target.
     * @tupleReturn
     */
    function swingDown(side?: number, sneaky?: boolean): [boolean, string];

    /**
     *
     * @param side - If given the robot will try to 'right-click' only on the surface as specified by side,
     * otherwise the robot will try all possible sides.
     * See the Sides API for a list of possible sides.
     * @param sneaky - If set to true the robot will simulate a sneak-right-click.
     * Some items (like buckets) will behave differently if this is set to true.
     * @param duration - how long the item is used.
     * This is useful when using charging items like a bow.
     * @returns `true` if the robot could interact with the block or entity in front of it, `false` otherwise.
     * If successful the secondary parameter describes what the robot interacted with and
     * will be one of `blockactivated`, `itemplaced`, `iteminteracted` or `itemused`.
     * @tupleReturn
     */
    function use(
        side?: number,
        sneaky?: boolean,
        duration?: number
    ): [boolean, string?];

    /**
     * As robot.use except that the item is used aiming at the area above the robot.
     * @tupleReturn
     */
    function useUp(
        side?: number,
        sneaky?: boolean,
        duration?: number
    ): [boolean, string?];

    /**
     * As robot.use except that the item is used aiming at the area below the robot.
     * @tupleReturn
     */
    function useDown(
        side?: number,
        sneaky?: boolean,
        duration?: number
    ): [boolean, string?];

    /**
     * Tries to move the robot forward.
     * @returns `true` if the robot successfully moved, `null` otherwise.
     * If movement fails a secondary result will be returned describing why it failed,
     * which will either be `impossible move`, `not enough energy` or the description of the obstacle as `robot.detect` would return.
     * @tupleReturn
     */
    function forward(): [boolean, string?];

    /**
     * As `robot.forward()` except that the robot tries to move backward.
     * @tupleReturn
     */
    function back(): [boolean, string?];

    /**
     * As `robot.forward()` except that the robot tries to move upwards.
     * @tupleReturn
     */
    function up(): [boolean, string?];

    /**
     * As `robot.forward()` except that the robot tries to move downwards.
     * @tupleReturn
     */
    function down(): [boolean, string?];

    /**
     * Turns the robot 90° to the left.
     */
    function turnLeft(): void;

    /**
     * Turns the robot 90° to the right.
     */
    function turnRight(): void;

    /**
     * The number of tanks installed in the robot.
     */
    function tankCount(): number;

    /**
     * Select the specified tank.
     * This determines which tank most operations operate on.
     */
    function selectTank(tank: number): void;

    /**
     * The the current fluid level in the specified tank, or, if none is specified, the selected tank.
     */
    function tankLevel(tank?: number): number;

    /**
     * The the remaining fluid capacity in the specified tank, or, if none is specified, the selected tank.
     */
    function tankSpace(): number;

    /**
     * Tests whether the fluid in the selected tank is the same as in the specified tank.
     */
    function compareFluidTo(tank: number): boolean;

    /**
     * Transfers the specified amount of fluid from the selected tank into the specified tank.
     * If no volume is specified, tries to transfer 1000 mB.
     */
    function transferFluidTo(tank: number, count?: number): boolean;

    /**
     * Tests whether the fluid in the selected tank is the same as in the world or the tank in front of the robot.
     */
    function compareFluid(): boolean;

    /**
     * Like `compareFluid`, but operates on the block above the robot.
     */
    function compareFluidUp(): boolean;

    /**
     * Like `compareFluid`, but operates on the block below the robot.
     */
    function compareFluidDown(): boolean;

    /**
     * Extracts the specified amount of fluid from the world or the tank in front of the robot.
     * When no amount is specified, will try to drain 1000 mB.
     */
    function drain(count?: number): boolean;

    /**
     * Like `drain`, but operates on the block above the robot.
     */
    function drainUp(count?: number): boolean;

    /**
     * Like `drain`, but operates on the block below the robot.
     */
    function drainDown(count?: number): boolean;

    /**
     * Injects the specified amount of fluid from the selected tank into the the world or the tank in front of the robot.
     * When no amount is specified, will try to eject 1000 mB.
     */
    function fill(count?: number): boolean;

    /**
     * Like `fill`, but operates on the block above the robot.
     */
    function fillUp(count?: number): boolean;

    /**
     * Like `fill`, but operates on the block below the robot.
     */
    function fillDown(count?: number): boolean;
}

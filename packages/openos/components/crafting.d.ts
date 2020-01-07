declare namespace OpenOS {
    /**
     * This component allows a robot to craft items and is provided by the crafting upgrade.
     * @see https://ocdoc.cil.li/component:crafting
     * @noSelf
     */
    interface Crafting {
        /**
         * Crafts up to count numbers or a full stack.
         * `count` - How many items to craft.
         * If omitted then the robot will craft as many items as possible.
         * In any case the robot will never craft more than one full stack of crafting result items at once.
         * Returns: `true` if at least one item was crafted, `false` otherwise.
         */
        craft(count?: number): boolean;
    }
}

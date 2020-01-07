declare namespace OpenOS {
    /**
     * This component is provided by the experience upgrade.
     * @see https://ocdoc.cil.li/component:experience
     * @noSelf
     */
    interface Experience {
        /**
         * Gets the level of experience stored in the experience upgrade.
         */
        level(): number;
    }
}

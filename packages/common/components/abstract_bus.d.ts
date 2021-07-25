declare namespace OC.Components {
    /**
     * This card allows for interfacing with Stargate Tech 2's Abstract Bus system.
     * @see https://ocdoc.cil.li/component:abstract_bus
     * @noSelf
     */
    interface AbstractBus {
        /**
         * Returns whether the local bus interface is enabled.
         */
        getEnabled(): boolean;

        /**
         * Sets whether the local bus interface should be enabled
         */
        setEnabled(enabled: boolean): void;

        /**
         * Returns the local interface address.
         * `number` is a 16 bit hexadecimal number (0xFFFF being a broadcast).
         * Returns 0 if an address has not yet been set.
         */
        getAddress(): number;

        /**
         * Sets the local interface address. `number` is a 16bit hexadecimal number.
         */
        setAddress(address: number): void;

        /**
         * Scans the abstract bus for attached devices and returns them in a list.
         */
        scan(mask: number): any;

        /**
         * Sends data across the abstract bus. The table data is in the form of key-value pairs, e.g.
         * `lua> component.abstract_bus.send(0xFFFF, { ["action"]="dial", ["address"]="Losomdeh Salothirt Erpac" })`
         * See SGTech2 documentation for more info on the Abstract Bus.
         */
        send(address: number, data: any): boolean;

        /**
         * Returns the maximum size a packet can be sent over the bus.
         */
        maxPacketSize(): number;
    }
}

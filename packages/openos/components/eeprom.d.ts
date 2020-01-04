/**
 * This component is provided by the EEPROM.
 * @see https://ocdoc.cil.li/component:eeprom
 * @noSelf
 */
declare interface EEPROM {
    /**
     * Get the currently stored byte array.
     */
    get(): string;

    /**
     * Overwrite the currently stored byte array.
     */
    set(data: string): void;

    /**
     * Get the label of the EEPROM.
     */
    getLabel(): string;

    /**
     * Set the label of the EEPROM.
     */
    setLabel(data: string): void;

    /**
     * Gets the maximum storage capacity of the EEPROM.
     */
    getSize(): number;

    /**
     * Gets the maximum data storage capacity of the EEPROM.
     */
    getDataSize(): number;

    /**
     * Gets currently stored byte-array (usually the component address of the main boot device).
     */
    getData(): string;

    /**
     * Overwrites currently stored byte-array with specified string.
     */
    setData(data: string): void;

    /**
     * Gets Checksum of data on EEPROM.
     */
    getChecksum(): string;

    /**
     * Makes the EEPROM Read-only if it isn't.
     * This process cannot be reversed.
     */
    makeReadonly(checksum: string): boolean;
}

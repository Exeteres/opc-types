/**
 * This component represents a Redstone card.
 * @see https://ocdoc.cil.li/component:redstone
 * @noSelf
 */
declare interface Redstone {
    // TODO Description
    getInput(side: number): number;

    getInput(): number[];

    getOutput(side: number): number;

    getOutput(): number[];

    setOutput(side: number, value: number): number;

    setOutput(values: number[]): number[];

    getBundledInput(side: number, color: number): number;

    getBundledInput(side: number): any;

    getBundledInput(): any[];

    getBundledOutput(side: number, color: number): number;

    getBundledOutput(side: number): any;

    getBundledOutput(): any[];

    setBundledOutput(side: number, color: number, value: number): number;

    getComparatorInput(side: number): number;

    getWirelessInput(): number;

    getWirelessOutput(): boolean;

    setWirelessOutput(value: boolean): boolean;

    getWirelessFrequency(): number;

    setWirelessFrequency(frequency: number): number;

    getWakeThreshold(): number;

    setWakeThreshold(threshold: number): number;
}

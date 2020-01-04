/**
 * The Note API provides functionality to convert music notes
 * into their respective MIDI code and/or their frequency in Hertz, among other things.
 * @see https://ocdoc.cil.li/api:note
 * @noSelf
 * @noResolution
 */
declare module "note" {
    /**
     * Converts a note in string form or a given frequency into the respective MIDI code
     */
    function midi(n: number | string): number;

    /**
     * Converts a note in string form or a given MIDI code into the respective frequency.
     */
    function freq(n: number | string): number;

    /**
     * Converts a MIDI value back into a string.
     */
    function name(n: number): string;

    /**
     * Converts note block ticks (0-24) into MIDI code (34-58, respectively) and vice-versa.
     */
    function ticks(n: number): number;

    /**
     * Plays a note from a string or MIDI code via computer.beep with the specified duration.
     */
    function play(tone: string | number, duration: number): void;
}

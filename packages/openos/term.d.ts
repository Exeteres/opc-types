/**
 * Provides a simplified way of writing text to screens and reading user input,
 * so you don't have to manually interact with the GPU API for these cases.
 * @see https://ocdoc.cil.li/api:term
 * @noSelf
 * @noResolution
 */
declare module "term" {
    /**
     * @returns Whether the term API is available for use, i.e. whether a primary GPU and screen are present.
     */
    function isAvailable(): boolean;

    /**
     * Gets the width, height, x offset, y offset, relative x, and relative y values.
     * @tupleReturn
     */
    function getViewport(): [number, number, number, number, number, number];

    /**
     * Gets the gpu proxy used by the term api.
     */
    function gpu(): OpenOS.GPU;

    /**
     * Acts exactly like event.pull taking the same parameters and returning the same results.
     * This method is used to blink the cursor while waiting for an event result.
     * @tupleReturn
     */
    function pull(...params: any[]): any[];

    /**
     * Gets the current position of the cursor.
     * @tupleReturn
     */
    function getCursor(): [number, number];

    /**
     * Sets the cursor position to the specified coordinates.
     */
    function setCursor(col: number, row: number): void;

    /**
     * Gets whether the cursor blink is currently enabled,
     * i.e whether the cursor alternates between the actual “pixel” displayed at the cursor position
     * and a fully white block every half second.
     */
    function getCursorBlink(): boolean;

    /**
     * Sets whether cursor blink should be enabled or not.
     */
    function setCursorBlink(enabled: boolean): void;

    /**
     * Clears the complete screen and resets the cursor position to (1, 1).
     */
    function clear(): void;

    /**
     * Clears the line the cursor is currently on and resets the cursor's horizontal position to 1.
     */
    function clearLine(): void;

    /**
     * Read some text from the terminal, i.e. allow the user to input some text.
     * For example, this is used by the shell and Lua interpreter to read user input.
     *
     * The optional `history` table can be used to provide predefined text that can be cycled through via the up and down arrow keys.
     * It must be a sequence (i.e. the keys must be a gap-less integral interval starting at 1).
     * This is used for the command history in shell and Lua interpreter, for example.
     * If text is entered and confirmed with enter, it will be added to the end of this table.
     *
     * The `dobreak` parameter, when set to false (nil defaults to true!) will not enter a new line after input was completed (e.g. by the user pressing enter).
     *
     * The `hint` parameter is used for tab completion.
     * It can either be a table with strings or a function that returns a table of strings and takes two parameters,
     * the current text and the position in that text, i.e. the signature of the callback is function(line:string, pos:number):table
     *
     * The `pwchar` parameter, when given, causes input to be masked using the first char of the given string.
     * For example, providing "*" will make all entered characters appear as stars.
     * The returned value will still be the actual text inserted, of course.
     *
     * The function will return a string if input was successful, nil if the pipe was closed (^d), or false if the pipe was interrupted (^c).
     */
    function read(
        history?: string[],
        dobreak?: boolean,
        hint?: string[] | Function,
        pwchar?: string
    ): string;

    /**
     * Allows writing optionally wrapped text to the terminal starting at the current cursor position, updating the cursor accordingly.
     * It automatically converts tab characters to spaces using text.detab.
     * If wrap is true, it will automatically word-wrap the text.
     * It will scroll the displayed buffer if the cursor exceeds the bottom of the display area,
     * but not if it exceeds the right of the display area (when wrap is false).
     */
    function write(value: string, wrap?: boolean): void;

    /**
     * Binds a gpu proxy (not address) to the terminal.
     * This method is called automatically during boot when the gpu and screen become available.
     * Note that if manually rebinding a terminal to a screen with different width and height, the terminal draw area will be truncated and not maximized.
     * This changes the gpu used in all terminal output, not just via the term api, i.e. io.write, print,
     * io.stdout:write, etc all use the same output stream, and term.bind is used to change the gpu used.
     */
    function bind(gpu: OpenOS.GPU): void;

    /**
     * Convenience method, simply calls getScreen on the terminal's bound gpu (see `term.bind`).
     */
    function screen(): string;

    /**
     * Gets the address of the keyboard the terminal is accepting key events from.
     */
    function keyboard(): string;
}

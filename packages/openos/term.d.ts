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
     */
    function getViewport(): [number, number, number, number, number, number];

    /**
     * Clears the complete screen and resets the cursor position to (1, 1).
     */
    function clear(): void;

    // TODO Other methods
}

/**
 * Library for drawing large text characters on screen using pixel patterns
 *
 * @noSelf
 * @noResolution
 */
declare module "BigLetters" {
    /**
     * Draws a single big letter character
     * @param x X coordinate
     * @param y Y coordinate
     * @param color Text color
     * @param symbol Character to draw
     * @param drawWithSymbol Whether to draw with symbol instead of filled rectangle
     * @returns Width of the drawn character
     */
    function draw(
        x: number,
        y: number,
        color: number,
        symbol: string,
        drawWithSymbol?: boolean
    ): number

    /**
     * Draws a string of big letters
     * @param x X coordinate
     * @param y Y coordinate
     * @param color Text color
     * @param text Text to draw
     * @param drawWithSymbol Whether to draw with symbol instead of filled rectangle
     * @returns Final x coordinate after drawing
     */
    function drawText(
        x: number,
        y: number,
        color: number,
        text: string,
        drawWithSymbol?: boolean
    ): number

    /**
     * Gets the size of text when drawn with big letters
     * @param text Text to measure
     * @returns Width and height as a tuple
     */
    function getTextSize(text: string): LuaMultiReturn<[number, number]>
}
/**
 * Library for efficient usage of GPU resources and rendering data on screen as fast as possible.
 * Uses double buffering with 6 tables in RAM to dramatically reduce GPU calls.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Screen-API
 * @noSelf
 * @noResolution
 */
declare module "Screen" {
    /**
     * Sets the GPU component address that should be used for drawing operations.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     * @param address GPU component address
     */
    function setGPUAddress(address: string): void

    /**
     * Returns address of currently used GPU component
     * @returns GPU component address
     */
    function getGPUAddress(): string

    /**
     * Binds GPU used by library to given screen component address.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     * @param address Screen component address
     * @param reset Optional parameter to also reset screen resolution to maximum
     * @returns Success status and optional error message
     */
    function setScreenAddress(address: string, reset?: boolean): LuaMultiReturn<[true] | [false, string]>

    /**
     * Returns address of currently bound screen
     * @returns Screen component address
     */
    function getScreenAddress(): string

    // Screen resolution

    /**
     * Returns screen buffer resolution
     * @returns Width and height
     */
    function getResolution(): LuaMultiReturn<[number, number]>

    /**
     * Gets screen width
     * @returns Screen width
     */
    function getWidth(): number

    /**
     * Gets screen height
     * @returns Screen height
     */
    function getHeight(): number

    /**
     * Sets screen buffer and GPU resolution.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     * @param width Screen width
     * @param height Screen height
     */
    function setResolution(width: number, height: number): void

    /**
     * Returns largest supported screen resolution
     * @returns Maximum width and height
     */
    function getMaxResolution(): LuaMultiReturn<[number, number]>

    /**
     * Returns multiblock screen structure size in blocks
     * @returns Aspect ratio width and height
     */
    function getScreenAspectRatio(): LuaMultiReturn<[number, number]>

    /**
     * Returns "best" screen resolution that can be fitted on multiblock screen structure
     * with smallest possible "black lines" size.
     * @param scale Optional scale factor (0.1-1.0)
     * @returns Scaled width and height
     */
    function getScaledResolution(scale?: number): LuaMultiReturn<[number, number]>

    // Color depth

    /**
     * Sets currently used GPU color depth
     * @param depth Color depth
     */
    function setColorDepth(depth: number): void

    /**
     * Returns currently used GPU color depth
     * @returns Color depth
     */
    function getColorDepth(): number

    /**
     * Returns largest supported GPU color depth
     * @returns Maximum color depth
     */
    function getMaxColorDepth(): number

    // Rendering

    /**
     * Checks what pixels need to be drawn and draws them on screen.
     * If force is true, draws the complete buffer without checking changes.
     * @param force Force complete redraw without change detection
     */
    function update(force?: boolean): void

    /**
     * Sets buffer draw limit to specified values.
     * Any operations beyond the limits will be ignored.
     * By default, the limit is x ∈ [1 screen.{@link width}] and y ∈ [1 screen.{@link width}].
     * @param x1 Left boundary
     * @param y1 Top boundary
     * @param x2 Right boundary
     * @param y2 Bottom boundary
     */
    function setDrawLimit(x1: number, y1: number, x2: number, y2: number): void

    /**
     * Resets drawing limits to full screen
     */
    function resetDrawLimit(): void

    /**
     * Returns currently set draw limit
     * @returns Draw limits (x1, y1, x2, y2)
     */
    function getDrawLimit(): LuaMultiReturn<[number, number, number, number]>

    /**
     * Copies content of specified area from screen buffer
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Area width
     * @param height Area height
     * @returns Pixel data table that can be used with screen.paste()
     */
    function copy(x: number, y: number, width: number, height: number): any[]

    /**
     * Pastes copied screen buffer contents to specified coordinates
     * @param x X coordinate
     * @param y Y coordinate
     * @param pixelData Pixel data from screen.copy()
     */
    function paste(x: number, y: number, pixelData: any[]): void

    /**
     * Sets values of specified pixel on screen
     * @param x X coordinate
     * @param y Y coordinate
     * @param background Background color
     * @param foreground Foreground color
     * @param char Character
     */
    function set(x: number, y: number, background: number, foreground: number, char: string): void

    /**
     * Returns values of specified pixel on screen
     * @param x X coordinate
     * @param y Y coordinate
     * @returns Background, foreground, and character
     */
    function get(x: number, y: number): LuaMultiReturn<[number, number, string]>

    /**
     * Draws a rectangular area with specified pixel data.
     * If transparency is specified, the rectangle will "cover" existing pixel data like glass.
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Rectangle width
     * @param height Rectangle height
     * @param background Background color
     * @param foreground Foreground color
     * @param char Character
     * @param transparency Optional transparency (0-1)
     */
    function drawRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        background: number,
        foreground: number,
        char: string,
        transparency?: number
    ): void

    /**
     * Clears the screen with a specified color.
     * If arguments are not passed, the buffer is filled with black color and whitespace.
     * @param color Background color
     * @param transparency Optional transparency (0-1)
     */
    function clear(color?: number, transparency?: number): void

    /**
     * Draws text with a given color. Background color under text remains the same.
     * @param x X coordinate
     * @param y Y coordinate
     * @param color Text color
     * @param text Text to draw
     * @param transparency Optional transparency (0-1)
     */
    function drawText(x: number, y: number, color: number, text: string, transparency?: number): void

    /**
     * Draws an image loaded via {@link load}. Alpha channel is supported.
     * @param x X coordinate
     * @param y Y coordinate
     * @param picture Image data
     * @param blendForeground Whether to blend foreground colors
     */
    function drawImage(x: number, y: number, picture: any[], blendForeground?: boolean): void

    /**
     * Draws a line with specified pixel data from first point to second
     * @param x1 Start X coordinate
     * @param y1 Start Y coordinate
     * @param x2 End X coordinate
     * @param y2 End Y coordinate
     * @param background Background color
     * @param foreground Foreground color
     * @param char Character
     */
    function drawLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        background: number,
        foreground: number,
        char: string
    ): void

    /**
     * Draws an ellipse with specified pixel data
     * @param centerX Center X coordinate
     * @param centerY Center Y coordinate
     * @param radiusX X radius
     * @param radiusY Y radius
     * @param background Background color
     * @param foreground Foreground color
     * @param char Character
     */
    function drawEllipse(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        background: number,
        foreground: number,
        char: string
    ): void

    /**
     * Draws a frame (border) with box-drawing characters
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Frame width
     * @param height Frame height
     * @param color Frame color
     */
    function drawFrame(x: number, y: number, width: number, height: number, color: number): void

    /**
     * Draws a polygon with specified pixel data
     * @param centerX Center X coordinate
     * @param centerY Center Y coordinate
     * @param radiusX X radius
     * @param radiusY Y radius
     * @param background Background color
     * @param foreground Foreground color
     * @param countOfEdges Number of edges
     * @param char Character
     */
    function drawPolygon(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        background: number,
        foreground: number,
        countOfEdges: number,
        char: string
    ): void

    /**
     * Applies blur effect with box kernel to a given rectangular region.
     * Optionally, a blend color with transparency can be applied after blurring to create a "glassy panel effect".
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Area width
     * @param height Area height
     * @param radius Blur radius
     * @param color Optional blend color
     * @param transparency Optional transparency (0-1)
     */
    function blur(
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number,
        color?: number,
        transparency?: number
    ): void

    /**
     * Sets semi-pixel value at specified coordinates using ▄ symbol
     * @param x X coordinate
     * @param y Y coordinate (1 to screen.height * 2)
     * @param color Pixel color
     */
    function semiPixelSet(x: number, y: number, color: number): void

    /**
     * Draws semi-pixel rectangle
     * @param x X coordinate
     * @param y Y coordinate (1 to screen.{@link height} * 2)
     * @param width Rectangle width
     * @param height Rectangle height (in semi-pixels)
     * @param color Rectangle color
     */
    function drawSemiPixelRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number
    ): void

    /**
     * Rasterizes a semi-pixel line with specified color
     * @param x1 Start X coordinate
     * @param y1 Start Y coordinate (1 to screen.{@link height} * 2)
     * @param x2 End X coordinate
     * @param y2 End Y coordinate (1 to screen.{@link height} * 2)
     * @param color Line color
     */
    function drawSemiPixelLine(x1: number, y1: number, x2: number, y2: number, color: number): void

    /**
     * Draws semi-pixel ellipse with specified color
     * @param centerX Center X coordinate
     * @param centerY Center Y coordinate (1 to screen.height * 2)
     * @param radiusX X radius
     * @param radiusY Y radius (in semi-pixels)
     * @param color Ellipse color
     */
    function drawSemiPixelEllipse(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        color: number
    ): void

    /**
     * Draws a Bézier curve with a specified color.
     * The accuracy argument means drawing an iteration step. Less accuracy means a more realistic curve.
     * @param points Array of points {x, y}
     * @param color Curve color
     * @param precision Drawing iteration step (lower = more realistic)
     */
    function drawSemiPixelCurve(
        points: Array<{ x: number; y: number }>,
        color: number,
        precision?: number
    ): void

    /**
     * Sets screen buffer resolution and fills with black pixels and whitespace.
     * Unlike setResolution(), it does not change the current GPU resolution.
     * @param width Optional width (defaults to current GPU resolution)
     * @param height Optional height (defaults to current GPU resolution)
     */
    function flush(width?: number, height?: number): void

    /**
     * Converts screen coordinates to screen buffer index.
     * For example, pixel 2x1 has buffer index 4, and pixel 3x1 has index 7.
     * @param x X coordinate
     * @param y Y coordinate
     * @returns Buffer index
     */
    function getIndex(x: number, y: number): number

    /**
     * Sets specified data values to pixel with specified index
     * @param index Buffer index
     * @param background Background color
     * @param foreground Foreground color
     * @param char Character
     */
    function rawSet(index: number, background: number, foreground: number, char: string): void

    /**
     * Returns data values of pixel with specified index
     * @param index Buffer index
     * @returns Background, foreground, and character
     */
    function rawGet(index: number): LuaMultiReturn<[number, number, string]>

    /**
     * Returns current screen buffer frames (that are displayed on screen).
     * Used in rare cases where maximum performance and manual buffer changing is required.
     * @returns Current frame backgrounds, foregrounds, and characters arrays
     */
    function getCurrentFrameTables(): LuaMultiReturn<[number[], number[], string[]]>

    /**
     * Returns frames that the user is changing in realtime (before calling screen.update()).
     * Used in rare cases where maximum performance and manual buffer changing is required.
     * @returns New frame backgrounds, foregrounds, and characters arrays
     */
    function getNewFrameTables(): LuaMultiReturn<[number[], number[], string[]]>

    /**
     * Rasterizes a line using custom method for each pixel
     * @param x1 Start X coordinate
     * @param y1 Start Y coordinate
     * @param x2 End X coordinate
     * @param y2 End Y coordinate
     * @param method Callback function(x, y) for each pixel
     */
    function rasterizeLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        method: (x: number, y: number) => void
    ): void

    /**
     * Rasterizes an ellipse using custom method for each pixel
     * @param centerX Center X coordinate
     * @param centerY Center Y coordinate
     * @param radiusX X radius
     * @param radiusY Y radius
     * @param method Callback function(x, y) for each pixel
     */
    function rasterizeEllipse(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        method: (x: number, y: number) => void
    ): void

    /**
     * Rasterizes a polygon using custom method for each pixel
     * @param centerX Center X coordinate
     * @param centerY Center Y coordinate
     * @param startX Start X coordinate
     * @param startY Start Y coordinate
     * @param countOfEdges Number of polygon edges
     * @param method Callback function(x, y) for each pixel
     */
    function rasterizePolygon(
        centerX: number,
        centerY: number,
        startX: number,
        startY: number,
        countOfEdges: number,
        method: (x: number, y: number) => void
    ): void
}
/**
 * @see https://github.com/IgorTimofeev/DoubleBuffering
 * @noSelf
 * @noResolution
 */
declare module "doubleBuffering" {
    /**
     * Get screen buffer resolution.
     * There's also `buffer.getWidth()` and `buffer.getHeight()` methods for your comfort.
     * @tupleReturn
     */
    function getResolution(): [number, number];

    /**
     * Set screen buffer and GPU resolution.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     */
    function setResolution(width: number, height: number): void;

    /**
     * Bind the GPU used by library to the specified screen component address.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     */
    function bindScreen(address: string): void;

    /**
     * Set the GPU component address is used by library.
     * Content of buffer will be cleared with black pixels and whitespace symbol.
     */
    function bindGPU(address: string): void;

    /**
     * Get a pointer to currently bound GPU component proxy.
     */
    function getGPUProxy(): any;

    /**
     * Draw contents of screen buffer on screen.
     * If optional argument force is specified, then the contents of screen
     * buffer will be drawn completely and regardless of the changed pixels.
     */
    function drawChanges(force?: boolean): void;

    /**
     * Set buffer draw limit to the specified values.
     * In this case, any operations that go beyond the limits will be ignored.
     * By default, the buffer always has a drawing limit in the ranges
     * `x ∈ [1; buffer.width]` and `y ∈ [1; buffer.height]`
     */
    function setDrawLimit(x1: number, y1: number, x2: number, y2: number): void;

    /**
     * Get currently set draw limit
     * @tupleReturn
     */
    function getDrawLimit(): [number, number, number, number];

    /**
     * Copy content of specified area from screen buffer and return it as a table.
     * Later it can be used with `buffer.paste(...)`.
     */
    function copy(
        x: number,
        y: number,
        width: number,
        height: number
    ): PixelData;

    /** Paste the copied contents of screen buffer to the specified coordinates. */
    function paste(x: number, y: number, pixelData: PixelData): void;

    /** Set value of specified pixel on screen. */
    function set(
        x: number,
        y: number,
        background: number,
        foreground: number,
        symbol: string
    ): void;

    /**
     * Get value of specified pixel on screen.
     * @tupleReturn
     */
    function get(x: number, y: number): [number, number, string];

    /**
     * Fill the rectangular area with the specified pixel data.
     * If optional transparency parameter is specified, the rectangle
     * will "cover" existing pixel data, like a glass.
     */
    function drawRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        background: number,
        foreground: number,
        symbol: string,
        transparency?: number
    ): void;

    /**
     * It works like `buffer.square(...)`, but it applies immediately to all the pixels in the buffer.
     * If arguments are not passed, then the buffer is filled with the standard black color and the whitespace symbol.
     */
    function clear(color?: number, transparency?: number): void;

    /**
     * Draw the text of the specified color.
     * The background color under text will remain the same.
     * It is also possible to set the transparency of the text.
     */
    function drawText(
        x: number,
        y: number,
        color: number,
        text: string,
        transparency?: number
    ): void;

    /**
     * Draw image that was loaded earlier via `image.load(...)` method.
     * The alpha channel of image is also supported.
     */
    function drawImage(x: number, y: number, picture: Image): void;

    /** Draw ellipse with specified pixel data. */
    function drawEllipse(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        background: number,
        foreground: number,
        symbol: string
    ): void;

    /** Set semi-pixel value in specified coordinates. */
    function semiPixelSet(x: number, y: number, color: number): void;

    /** Draw semi-pixel rectangle. */
    function drawSemiPixelRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number
    ): void;

    /** Rasterize a semi-pixel line witch specified color. */
    function drawSemiPixelLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: number
    ): void;

    /** Draw semi-pixel ellipse with specified color. */
    function drawSemiPixelEllipse(
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number,
        color: number
    ): void;

    /** Draw the Bezier Curve with specified color */
    function drawSemiPixelCurve(
        points: Point[],
        color: number,
        accuracy: number
    ): void;

    /**
     * Set screen buffer resolution to the specified one and fill it with black pixels and whitespace stringacter.
     * Unlike `buffer.setResolution()` it does not change the current resolution of the GPU.
     * If optional arguments are not specified, then the buffer size becomes equivalent to the current GPU resolution.
     */
    function flush(width?: number, height?: number): void;

    /** Convert screen coordinates to the screen buffer index. */
    function getIndex(x: number, y: number): number;

    /** Convert screen buffer index to it's screen coordinates. */
    function getCoordinates(index: number): number;

    /** Set specified data values to pixel with specified index. */
    function rawSet(
        index: number,
        background: number,
        foreground: number,
        symbol: string
    ): void;

    /**
     * Get data values of pixel with specified index.
     * @tupleReturn
     */
    function rawGet(index: number): [number, number, string];
}

type PixelData = number[][];

interface Point {
    x: number;
    y: number;
}

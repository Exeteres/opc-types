/**
 * Color manipulation library for RGB/HSB conversions and blending.
 * Allows you to extrude and pack color channels, convert the RGB color model to HSB and vice versa,
 * perform alpha blending, generate color transitions and convert the color to 8-bit format for the OpenComputers palette.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Color-API
 * @noSelf
 * @noResolution
 */
declare module "Color" {
    /**
     * Packs three color channels and returns a 24-bit color
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @returns 24-bit integer color value
     */
    function RGBToInteger(r: number, g: number, b: number): number

    /**
     * Extrudes three color channels from a 24-bit color
     * @param color 24-bit integer color value
     * @returns RGB components as a tuple (red, green, blue)
     */
    function integerToRGB(color: number): LuaMultiReturn<[number, number, number]>

    /**
     * Converts RGB to HSB color space
     * @param r Red component (0-255)
     * @param g Green component (0-255)
     * @param b Blue component (0-255)
     * @returns HSB components as a tuple (hue [0-360], saturation [0-1], brightness [0-1])
     */
    function RGBToHSB(r: number, g: number, b: number): LuaMultiReturn<[number, number, number]>

    /**
     * Converts HSB to RGB color space
     * @param h Hue (0-360)
     * @param s Saturation (0-1)
     * @param b Brightness (0-1)
     * @returns RGB components as a tuple (red, green, blue)
     */
    function HSBToRGB(h: number, s: number, b: number): LuaMultiReturn<[number, number, number]>

    /**
     * Converts integer color to HSB color space
     * @param color 24-bit integer color value
     * @returns HSB components as a tuple (hue [0-360], saturation [0-1], brightness [0-1])
     */
    function integerToHSB(color: number): LuaMultiReturn<[number, number, number]>

    /**
     * Converts HSB to integer color
     * @param h Hue (0-360)
     * @param s Saturation (0-1)
     * @param b Brightness (0-1)
     * @returns 24-bit integer color value
     */
    function HSBToInteger(h: number, s: number, b: number): number

    /**
     * Mixes two colors considering the transparency of the second color
     * @param color1 First color
     * @param color2 Second color
     * @param transparency Transparency of second color (0-1)
     * @returns Blended color
     */
    function blend(color1: number, color2: number, transparency: number): number

    /**
     * Generates a transitive color between the first and second ones.
     * Position 0.0 is equivalent to the first color, and 1.0 is the second color
     * @param color1 Start color
     * @param color2 End color
     * @param position Position in transition (0-1)
     * @returns Interpolated color
     */
    function transition(color1: number, color2: number, position: number): number

    /**
     * Looks to 256-color OpenComputers palette and returns the color index that most accurately matches the given value.
     * This method is quite slow and not suitable for real-time graphics.
     * @param color24Bit 24-bit color value
     * @returns 8-bit palette index
     */
    function to8Bit(color24Bit: number): number

    /**
     * Converts 8-bit palette index to 24-bit color. This operation is almost instant.
     * @param color8Bit 8-bit palette index
     * @returns 24-bit color value
     */
    function to24Bit(color8Bit: number): number

    /**
     * Optimizes color by converting to 8-bit and back to 24-bit
     * @param color24Bit 24-bit color value
     * @returns Optimized 24-bit color value
     */
    function optimize(color24Bit: number): number
}
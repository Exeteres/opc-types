declare namespace OC.Components {
    /**
     * This is the component provided by graphics cards.
     * For simple programs the term API will usually all you need.
     * For more complex operations, or to get a bit more performance, you may wish to interact with the GPU directly, though.
     * @see https://ocdoc.cil.li/component:gpu
     * @noSelf
     */
    interface GPU {
        /**
         * Tries to bind the GPU to a screen with the specified address.
         * Returns true on success, false and an error message on failure.
         * Resets the screen's settings if reset is 'true'.
         * A GPU can only be bound to one screen at a time.
         * All operations on it will work on the bound screen.
         * If you wish to control multiple screens at once, you'll need to put more than one graphics card into your computer.
         */
        bind(address: string, reset?: boolean): LuaMultiReturn<[boolean, string | null]>;

        /**
         * Get the address of the screen the GPU is bound to. Since 1.3.2.
         */
        getScreen(): string;

        /**
         * Gets the current background color.
         * This background color is applied to all “pixels” that get changed by other operations.
         * Note that the returned number is either an RGB value in hexadecimal format, i.e. `0xRRGGBB`, or a palette index.
         * The second returned value indicates which of the two it is (`true` for palette color, `false` for RGB value).
         */
        getBackground(): LuaMultiReturn<[number, boolean]>;

        /**
         * Sets the background color to apply to “pixels” modified by other operations from now on.
         * The returned value is the old background color, as the actual value it was set to
         * (i.e. not compressed to the color space currently set).
         * The first value is the previous color as an RGB value.
         * If the color was from the palette, the second value will be the index in the palette.
         * Otherwise it will be `nil`. Note that the color is expected to be specified in hexadecimal RGB format, i.e. `0xRRGGBB`.
         * This is to allow uniform color operations regardless of the color depth supported by the screen and GPU.
         */
        setBackground(color: number, isPaletteIndex?: boolean): LuaMultiReturn<[number, number | null]>;

        /**
         * Like `getBackground`, but for the foreground color.
         */
        getForeground(): LuaMultiReturn<[number, boolean]>;

        /**
         * Like `setBackground`, but for the foreground color.
         */
        setForeground(color: number, isPaletteIndex?: boolean): LuaMultiReturn<[number, number | null]>;

        /**
         * Gets the RGB value of the color in the palette at the specified index.
         */
        getPaletteColor(index: number): number;

        /**
         * Sets the RGB value of the color in the palette at the specified index.
         */
        setPaletteColor(index: number, value: number): number;

        /**
         * Gets the maximum supported color depth supported by the GPU and the screen it is bound to (minimum of the two).
         */
        maxDepth(): number;

        /**
         * The currently set color depth of the GPU/screen, in bits. Can be 1, 4 or 8.
         */
        getDepth(): number;

        /**
         * Sets the color depth to use.
         * Can be up to the maximum supported color depth.
         * If a larger or invalid value is provided it will throw an error.
         * Returns true if the depth was set, false otherwise.
         */
        setDepth(bit: number): boolean;

        /**
         * Gets the maximum resolution supported by the GPU and the screen it is bound to (minimum of the two).
         */
        maxResolution(): LuaMultiReturn<[number, number]>;

        /**
         * Gets the currently set resolution.
         */
        getResolution(): LuaMultiReturn<[number, number]>;

        /**
         * Sets the specified resolution.
         * Can be up to the maximum supported resolution.
         * If a larger or invalid resolution is provided it will throw an error.
         * Returns true if the resolution was changed
         * (may return false if an attempt was made to set it to the same value it was set before), false otherwise.
         */
        setResolution(width: number, height: number): boolean;

        /**
         * Get the current viewport resolution.
         */
        getViewport(): LuaMultiReturn<[number, number]>;

        /**
         * Set the current viewport resolution.
         * Returns true if it was changed (may return false if an attempt was made to set it to the same value it was set before), false otherwise.
         * This makes it look like screen resolution is lower, but the actual resolution stays the same.
         * Characters outside top-left corner of specified size are just hidden,
         * and are intended for rendering or storing things off-screen and copying them to the visible area when needed.
         * Changing resolution will change viewport to whole screen.
         */
        setViewport(width: number, height: number): boolean;

        /**
         * Gets the character currently being displayed at the specified coordinates.
         * The second and third returned values are the fore- and background color, as hexvalues.
         * If the colors are from the palette, the fourth
         * and fifth values specify the palette index of the color, otherwise they are nil.
         */
        get(x: number, y: number): LuaMultiReturn<[string, number, number, number | null, number | null]>;

        /**
         * Writes a string to the screen, starting at the specified coordinates.
         * The string will be copied to the screen's buffer directly, in a single row.
         * This means even if the specified string contains line breaks, these will just be printed as special characters,
         * the string will not be displayed over multiple lines.
         * Returns true if the string was set to the buffer, false otherwise.
         * The optional fourth argument makes the specified text get printed vertically instead, if true.
         */
        set(x: number, y: number, value: string, vertical?: boolean): boolean;

        /**
         * Copies a portion of the screens buffer to another location.
         * The source rectangle is specified by the x, y, width and height parameters.
         * The target rectangle is defined by x + tx, y + ty, width and height. Returns true on success, false otherwise.
         */
        copy(x: number, y: number, width: number, height: number, tx: number, ty: number): boolean;

        /**
         * Fills a rectangle in the screen buffer with the specified character.
         * The target rectangle is specified by the x and y coordinates and the rectangle's width and height.
         * The fill character char must be a string of length one, i.e. a single character.
         * Returns true on success, false otherwise.
         * Note that filling screens with spaces ( ) is usually less expensive,
         * i.e. consumes less energy, because it is considered a “clear” operation (see config).
         */
        fill(x: number, y: number, width: number, height: number, char: string): boolean;
    }
}

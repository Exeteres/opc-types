declare namespace OpenPrinter {
    /**
     * The printer requires {@link https://github.com/PC-Logix/OpenPrinter/wiki/inkCartridges|Ink Cartridges} in the left slots and paper in the right slot to print.
     * The top Slot is the input Slot for scanning Pages/Books.
     * The 9 Slots on the bottom are the printer output.
     *
     * @see https://github.com/PC-Logix/OpenPrinter/wiki/printer
     * @noSelf
     * @noResolution
     */
    interface Printer {
        /**
         * String, and center are optional, a format is 0xRRGGBB, using this will add one use of your color ink cartridge, center will attempt to render the string in the center of the page, instead of left justified.
         * 
         * You CAN use Minecraft's chat formatting control codes with calls to writeln, Minecraft Color Codes EACH CALL to a COLOR set will add one use of the color ink cartridge, calls to format codes will NOT.
         *
         * @param text Text to render on the page.
         * @param color Text color as 0xRRGGBB.
         * @param align Alignment for the text, currently only supports center.
         */
        writeln(text: string, color?: number, align?: 'center'): void

        /**
         * Sets the "name" of the printed page, this also affects the item display in your inventory, never forget which page is which!
         *
         * @param text Title to apply to the printed page item.
         */
        setTitle(text: string): void

        /**
         * Returns the amount of paper in your printer, 0-64 for Normal MC paper, or 0-256 for a paper roll.
         */
        getPaperLevel(): number

        /**
         * Returns the number of uses left in the ink cartridge 0-4000 (default)
         */
        getColorInkLevel(): number

        /**
         * Returns the number of uses left in the ink cartridge 0-4000 (default)
         */
        getBlackInkLevel(): number

        /**
         * Will clear everything set by previous calls to {@link writeln()}
         */
        clear(): void

        /**
         * Calling this method will print all previous calls to {@link writeln()} to the printer.
         */
        print(): boolean

        /**
         * Scans a printed page and returns the lines as table
         */
        scan(): string[]

        /**
         * Scans the given line from a printed page
         *
         * @param lineNumber 1-based line number to scan from the page.
         */
        scanLine(lineNumber: number): string

        /**
         * Scans a book and returns it as a table (vanilla and bibliocraft BigBook are currently supported)
         */
        scanBook(): string[]
    }
}

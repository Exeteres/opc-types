/**
 * Simple XML parsing library
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/XML-API
 * @noSelf
 * @noResolution
 */
declare module "XML" {
    /**
     * Parsed XML element structure
     */
    interface XMLElement {
        /** Element tag name */
        label: string
        /** Element attributes as key-value pairs */
        xarg: Record<string, string>
        /** 1 if an element is self-closing, undefined otherwise */
        empty?: number
        /** Child elements and text content (indexed numerically) */
        [index: number]: XMLElement | string
    }

    /**
     * Parses XML attributes from a string
     * @param s Attribute string (e.g., 'name="value" id="123"')
     * @returns Object with attribute key-value pairs
     */
    function parseargs(s: string): Record<string, string>

    /**
     * Parses XML string into element tree
     * @param s XML string to parse
     * @returns Array of root XML elements
     */
    function collect(s: string): XMLElement[]
}

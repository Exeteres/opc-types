/**
 * This API allows you to refer to key codes by name, using the keyboard.keys table.
 * @see https://ocdoc.cil.li/api:keyboard
 * @noSelf
 * @noResolution
 */
declare module "keyboard" {
    /**
     * Checks if one of the Alt keys is currently being held by some user.
     */
    function isAltDown(): boolean;

    /**
     * Checks if the specified character is a control character as defined by Java's `Character` class.
     */
    function isControl(char: number): boolean;

    /**
     * Checks if one of the Control keys is currently being held by some user.
     */
    function isControlDown(): boolean;

    /**
     * Checks if a specific key is currently being by some user.
     * If a number is specified it is assumed it's a key code.
     * If a string is specified it is assumed it's a single character,
     * such as the ones passed by keyboard events.
     */
    function isKeyDown(charOrCode: any): boolean;

    /**
     * Checks if one of the Shift keys is currently being held by some user.
     */
    function isShiftDown(): boolean;
}

/**
 * Keyboard input handling library with key code constants and state tracking
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Keyboard-API
 * @noSelf
 * @noResolution
 */
declare module "Keyboard" {
    const LEFT_CONTROL = 29
    const RIGHT_CONTROL = 157
    const LEFT_SHIFT = 42
    const RIGHT_SHIFT = 54
    const LEFT_ALT = 56
    const RIGHT_ALT = 184
    const COMMAND_KEY = 219
    const WINDOWS_KEY = 219

    const ONE = 2, TWO = 3, THREE = 4, FOUR = 5, FIVE = 6
    const SIX = 7, SEVEN = 8, EIGHT = 9, NINE = 10, ZERO = 11

    const A = 30, B = 48, C = 46, D = 32, E = 18, F = 33, G = 34, H = 35
    const I = 23, J = 36, K = 37, L = 38, M = 50, N = 49, O = 24, P = 25
    const Q = 16, R = 19, S = 31, T = 20, U = 22, V = 47, W = 17, X = 45
    const Y = 21, Z = 44

    const MINUS = 12
    const PLUS = 13
    const BACKSPACE = 14
    const TAB = 15
    const SINGLE_QUOTE = 26
    const EXCLAMATION = 27
    const ENTER = 28
    const OPEN_QUOTE = 40
    const COMMA = 51
    const DOT = 52
    const SPACE = 57

    const UP = 200
    const DOWN = 208
    const RIGHT = 205
    const LEFT = 203

    /**
     * Checks if a key is currently pressed down
     * @param code Key code to check
     * @returns True if key is pressed
     */
    function isKeyDown(code: number): boolean

    /**
     * Checks if a code represents a control character
     * @param code Character code
     * @returns True if control character
     */
    function isControl(code: number): boolean

    /**
     * Checks if any Alt key is pressed
     * @returns True if Alt is pressed
     */
    function isAltDown(): boolean

    /**
     * Checks if any Control key is pressed
     * @returns True if Control is pressed
     */
    function isControlDown(): boolean

    /**
     * Checks if any Shift key is pressed
     * @returns True if Shift is pressed
     */
    function isShiftDown(): boolean

    /**
     * Checks if Command (Mac/Linux) or Windows key is pressed
     * @returns True if a Command/Windows key is pressed
     */
    function isCommandDown(): boolean
}
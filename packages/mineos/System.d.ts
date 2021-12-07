/**
 * This library is the core of the operating system and allows you to manage it at a basic level.
 * @see https://github.com/IgorTimofeev/MineOS/wiki/System-API
 * @noSelf
 * @noResolution
 */
declare module "System" {
    /**
     * Returns real world Unix timestamp of current system using timezone defined in user properties.
     */
    export function getTime(): number;

    /**
     * Returns path to currently running script.
     */
    export function getCurrentScript(): string;

    /**
     * Returns temporary directory with random name.
     * It will be erased on next MineOS boot.
     */
    export function getTemporaryPath(): string;

    type StringDictionary = {
        [key: string]: string;
    };
    type Option = string | StringDictionary;

    /**
     * Method for programs to parse their arguments.
     * Returns two tables, the first one containing all incoming arguments, the second containing options.
     * Options must be indicated by a leading -, and all options must only be a single character,
     * since multiple characters following a single - will be interpreted as multiple options.
     * Options specified with 2 dashes are not split and can have multiple letters.
     * Also, 2-dash options can be given values by using an equal sign.
     */
    export function parseArguments(): LuaMultiReturn<[string[], Option[]]>;

    /**
     * Creates an shortcut with .lnk extension by given where path.
     * Shortcut points to a file or directory located on given forWhat path.
     */
    export function createShortcut(
        wherePath: string,
        forWhatPath: string
    ): void;

    /**
     * Reads shortcut located by given shortcutPath and returns a string targetPath it points to.
     */
    export function readShortcut(shortcutPath: string): string;

    /**
     * Returns currently logged in user name.
     */
    export function getUser(): string;

    /**
     * Writes currently logged in user settings table to a `%user_path%/Settings.cfg` file.
     */
    export function saveUserSettings(): void;

    /**
     * Returns currently logged in user settings table.
     * You can change it's keys and values whatever you want and call `system.saveUserSettings()` method.
     */
    export function getUserSettings(): any;

    /**
     * Moves user to authorization interface stage.
     */
    export function authorize(): void;

    /**
     * Searches for files with `.lang` extension in directory by given path and returns an deserialized table.
     * Priority is given to the language that is set in currently logged in user properties.
     * If required language is not found, this function tries to load `English.lang` file.
     * If it is not found, function tries to load the first available file.
     * If the directory by given path is empty, an error occurs.
     */
    export function getLocalization(path: string): StringDictionary;

    /**
     * Works the same way as `system.getLocalization()` does,
     * but automatically searches for appropriate localization file in `Localizations/` directory located near currently running script.
     */
    export function getCurrentScriptLocalization(): StringDictionary;

    /**
     * Returns currently logged in user system localization table.
     */
    export function getSystemLocalization(): StringDictionary;

    /**
     * Returns pointer to main GUI.workspace object that is currently being used by MineOS.
     * This workspace contains every OS visual element: top menu object, windows container, dock widget, icon field, icons, etc.
     */
    export function getWorkspace(): GUI.Workspace;

    /**
     * Adds instance of `GUI.window` object to MineOS windows container, adds corresponding icon to dock and adds window menu data.
     * If `keepCoordinates` argument is set, window coordinates will be kept, otherwise window will be centered.
     * Returns pointer to main system `GUI.workspace` object, a pointer to given window object and a pointer to system `GUI.menu` object.
     */
    export function addWindow(
        window: GUI.Window,
        keepCoordinates?: boolean
    ): LuaMultiReturn<[GUI.Workspace, GUI.Window, GUI.Menu]>;
}

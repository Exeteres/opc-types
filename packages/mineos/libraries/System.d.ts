/**
 * This library is the core of the operating system and allows you to manage it at a basic level.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/System-API
 * @noSelf
 * @noResolution
 */
declare module "System" {
    import { UserPaths } from "Paths"
    import * as GUI from "GUI"

    type StringDictionary = { [key: string]: string }
    type Option = string | StringDictionary

    type NetworkFTPConnection = {
        address: string,
        port: number,
        user: string,
        password: string
    }

    interface UserSettings {
        localizationLanguage: string

        timeFormat: string
        timeRealTimestamp: boolean
        timeTimezone: number

        networkUsers: Record<string, { allowReadAndWrite: boolean }>
        networkName: string
        networkEnabled: boolean
        networkSignalStrength: number
        networkFTPConnections: NetworkFTPConnection[]

        interfaceScreenAddress: string | null
        interfaceWallpaperEnabled: boolean
        interfaceWallpaperPath: string
        interfaceWallpaperMode: number
        interfaceWallpaperBrightness: number
        interfaceTransparencyEnabled: boolean
        interfaceTransparencyDock: number
        interfaceTransparencyMenu: number
        interfaceTransparencyContextMenu: number
        interfaceBlurEnabled: boolean
        interfaceBlurRadius: number
        interfaceBlurTransparency: number

        filesShowExtension: boolean
        filesShowHidden: boolean
        filesShowApplicationIcon: boolean

        iconWidth: number
        iconHeight: number
        iconHorizontalSpace: number
        iconVerticalSpace: number

        tasks: { mode: number; enabled: boolean; path: string }[]
        dockShortcuts: string[]
        extensions: { [key: string]: string }

        filesSortingMethod?: 1 | 2 | 3
        securityPassword?: string
    }

    interface IconField extends GUI.Container {
        path: string
        filenameMatcher: string | null
        fromFile: number
        launchers: { [key: string]: (icon: Icon) => void }
        iconConfig: Record<string, { x: number, y: number }>
        iconConfigEnabled: boolean
        setPath(path: string): this
        updateFileList(): this
        clearSelection(): void
        getSelectedIcons(): Icon[]
        loadIconConfig(): void
        saveIconConfig(): void
        deleteIconConfig(): void
    }

    interface Icon extends GUI.Object {
        path: string
        extension: string
        isDirectory: boolean
        filename: string
        name: string
        image: LuaTable
        isShortcut: boolean
        shortcutPath: string
        shortcutExtension: string
        shortcutIsDirectory: boolean
        launch: () => void
        shortcutLaunch: () => void
        colors: {
            selectionTransparency: number
            selectionBackground: number
            selectionText: number
            defaultText: number
        }
        selected: boolean
        cut: boolean
        hideName: boolean
        semiTransparentImage: LuaTable
        windowCount: number
        windows: { [key: string]: GUI.Window }
        parent: IconField
        lastTouchX: number
        lastTouchY: number
        dragged: boolean
        analyseExtension(launchers: IconField['launchers']): Icon
    }

    /**
     * Returns the current system time in seconds, accounting for timezone offset
     * @return Current timestamp in seconds
     */
    export function getTime(): number

    /**
     * Returns the currently logged-in user's name
     * @return Username of the current user
     */
    export function getUser(): string

    /**
     * Returns the current user's settings object
     * @return User settings configuration
     */
    export function getUserSettings(): UserSettings

    /**
     * Returns the current system localization table with translated strings
     * @return Dictionary of localized strings
     */
    export function getSystemLocalization(): StringDictionary

    /**
     * Returns a fresh copy of default user settings
     * @return Default user settings object
     */
    export function getDefaultUserSettings(): UserSettings

    /**
     * Saves the current user settings to disk
     */
    export function saveUserSettings(): void

    /**
     * Returns the absolute path of the currently executing script
     * @return Full path to the current script
     */
    export function getCurrentScript(): string

    /**
     * Loads localization strings from the specified folder path
     * @param pathToLocalizationFolder Path to folder containing .lang files
     * @return Dictionary of localized strings
     */
    export function getLocalization(
        pathToLocalizationFolder: string
    ): StringDictionary

    /**
     * Loads localization strings from the Localizations folder relative to the current script
     * @return Dictionary of localized strings
     */
    export function getCurrentScriptLocalization(): StringDictionary

    /**
     * Generates a unique temporary file path that doesn't exist yet
     * @return Unique temporary path
     */
    export function getTemporaryPath(): string

    /**
     * Creates a shortcut (.lnk) file pointing to another file or directory
     * @param where Path where the shortcut should be created
     * @param forWhat Path to the target file/directory
     */
    export function createShortcut(where: string, forWhat: string): void

    /**
     * Parses command line arguments into positional args and named options
     * @param args Variable arguments to parse
     * @return Tuple of [positional arguments array, options object]
     */
    export function parseArguments(
        ...args: any[]
    ): LuaMultiReturn<[string[], Option[]]>

    /**
     * Reads the target path from a shortcut (.lnk) file
     * @param path Path to the shortcut file
     * @return Target path stored in the shortcut
     */
    export function readShortcut(path: string): string

    /**
     * Safely calls a function with error handling and traceback generation
     * @param method Function to call
     * @param args Arguments to pass to the function
     * @return Tuple of [success, errorPath?, lineNumber?, traceback?]
     */
    export function call(
        method: Function,
        ...args: any[]
    ): LuaMultiReturn<[boolean, string?, number?, string?]>

    /**
     * Enables or disables automatic unloading of required packages
     * @param value True to enable package unloading, false to disable
     */
    export function setPackageUnloading(value: boolean): void

    /**
     * Initiates an interactive screenshot tool allowing the user to select a region
     */
    export function takeScreenshot(): void

    /**
     * Adds an "Upload to Pastebin" menu item to a context menu
     * @param menu The context menu to add the item to
     * @param path Path to the file to upload
     */
    export function addUploadToPastebinMenuItem(
        menu: GUI.DropDownMenu,
        path: string
    ): void

    /**
     * Adds a "Set as Wallpaper" menu item to a context menu
     * @param menu The context menu to add the item to
     * @param path Path to the image file
     */
    export function addSetAsWallpaperMenuItem(
        menu: GUI.DropDownMenu,
        path: string
    ): void

    /**
     * Opens a dialog to launch a program with custom command line arguments
     * @param path Path to the executable to launch
     */
    export function launchWithArguments(path: string): void

    /**
     * Recalculates internal icon properties based on current user settings
     */
    export function calculateIconProperties(): void

    /**
     * Updates icon properties and refreshes the file list
     */
    export function updateIconProperties(): void

    /**
     * Adds a window to the workspace with proper positioning and dock integration
     * @param window The window to add
     * @param dontAddToDock If true, skip adding the window to the dock
     * @param preserveCoordinates If true, don't center the window automatically
     * @return Tuple of [workspace, window, menu]
     */
    export function addWindow<T extends GUI.Window>(
        window: T,
        dontAddToDock?: boolean,
        preserveCoordinates?: boolean
    ): LuaMultiReturn<[GUI.Workspace, T, GUI.Menu]>

    /**
     * Creates and displays a properties window for a file/folder icon
     * @param x X coordinate for the window
     * @param y Y coordinate for the window
     * @param width Width of the properties window
     * @param icon The icon to show properties for
     */
    export function addPropertiesWindow(
        x: number,
        y: number,
        width: number,
        icon: Icon
    ): void

    /**
     * Copies files from a list to a destination path with conflict resolution
     * @param fileList Array of source file paths
     * @param toPath Destination directory path
     */
    export function copy(fileList: string[], toPath: string): void

    /**
     * Creates a new menu widget container
     * @param width Width of the widget
     * @return The created menu widget object
     */
    export function menuWidget(width: number): GUI.Object

    /**
     * Adds a widget to the desktop menu layout
     * @param object The widget to add
     * @return The added widget object
     */
    export function addMenuWidget(object: GUI.Object): GUI.Object

    /**
     * Displays an error dialog with code preview and traceback
     * @param path Path to the file where the error occurred
     * @param line Line number where the error occurred
     * @param traceback Full error traceback string
     */
    export function error(path: string, line: number, traceback: string): void

    /**
     * Executes a Lua script file with error handling
     * @param path Path to the script to execute
     * @param args Arguments to pass to the script
     * @return Tuple of [success, errorPath?, lineNumber?, traceback?]
     */
    export function execute(
        path: string,
        ...args: any[]
    ): LuaMultiReturn<[boolean, string?, number?, string?]>

    /**
     * Returns the desktop wallpaper GUI object
     * @return The wallpaper object
     */
    export function getWallpaper(): GUI.Object

    /**
     * Reloads and updates the desktop wallpaper based on user settings
     */
    export function updateWallpaper(): void

    /**
     * Updates the GPU screen address based on user settings
     */
    export function updateScreen(): void

    /**
     * Updates the screen resolution and recalculates desktop layout
     */
    export function updateResolution(): void

    /**
     * Recreates all desktop UI elements including dock and icon field
     */
    export function updateDesktop(): void

    /**
     * Updates all menu bar widgets (time, battery, RAM)
     */
    export function updateMenuWidgets(): void

    /**
     * Updates color scheme based on transparency settings
     */
    export function updateColorScheme(): void

    /**
     * Sets the current logged-in user and updates paths
     * @param user Username to set as current
     */
    export function setUser(user: string): void

    /**
     * Clears and reinitializes the workspace container
     */
    export function updateWorkspace(): void

    /**
     * Creates a new user profile with default settings
     * @param name Username for the new user
     * @param language Localization language for the user
     * @param password Optional password (will be hashed if provided)
     * @param wallpaper Whether to enable wallpaper by default
     * @return Tuple of [user settings, user paths]
     */
    export function createUser(
        name: string,
        language: string,
        password?: string,
        wallpaper?: boolean
    ): LuaMultiReturn<[UserSettings, UserPaths]>

    /**
     * Sets the global workspace reference
     * @param workspace The workspace object to use
     */
    export function setWorkspace(workspace: GUI.Workspace): void

    /**
     * Returns the current workspace object
     * @return The active workspace
     */
    export function getWorkspace(): GUI.Workspace

    /**
     * Displays the user login/selection screen
     */
    export function authorize(): void

    /**
     * Returns the container holding all desktop windows
     * @return The windows container
     */
    export function getWindowsContainer(): GUI.Container

    /**
     * Returns the dock container
     * @return The dock container
     */
    export function getDockContainer(): GUI.Container

    /**
     * Creates either a blurred panel or standard panel based on user settings
     * @param container Parent container
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Panel width
     * @param height Panel height
     * @return The created panel (blurred or standard)
     */
    export function addBlurredOrDefaultPanel(
        container: GUI.Container,
        x: number,
        y: number,
        width: number,
        height: number
    ): GUI.Panel | GUI.BlurredPanel

    /**
     * Creates and displays a console window for debugging output
     * @return The console window object
     */
    export function addConsoleWindow(): GUI.Window
}

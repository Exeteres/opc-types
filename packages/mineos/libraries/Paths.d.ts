/**
 * System and user path constants for MineOS directory structure
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Paths-API
 * @noSelf
 * @noResolution
 */
declare module "Paths" {
    /**
     * User-specific directory paths
     */
    interface UserPaths {
        /** User home directory */
        home: string;
        /** Application data directory */
        applicationData: string;
        /** Desktop directory */
        desktop: string;
        /** User libraries directory */
        libraries: string;
        /** User applications directory */
        applications: string;
        /** User wallpapers directory */
        wallpapers: string;
        /** Trash directory */
        trash: string;
        /** User settings file */
        settings: string;
        /** User versions configuration file */
        versions: string;
    }

    /**
     * System-wide directory paths and application paths
     */
    interface SystemPaths {
        /** System libraries directory */
        libraries: string;
        /** System applications directory */
        applications: string;
        /** System icons directory */
        icons: string;
        /** Localizations directory */
        localizations: string;
        /** Extensions directory */
        extensions: string;
        /** Mount points directory */
        mounts: string;
        /** Temporary files directory */
        temporary: string;
        /** System wallpapers directory */
        wallpapers: string;
        /** Users directory */
        users: string;
        /** System versions configuration file */
        versions: string;

        /** Sample application path */
        applicationSample: string;
        /** App Market application path */
        applicationAppMarket: string;
        /** MineCode IDE application path */
        applicationMineCodeIDE: string;
        /** Finder application path */
        applicationFinder: string;
        /** Picture Edit application path */
        applicationPictureEdit: string;
        /** Settings application path */
        applicationSettings: string;
        /** 3D Print application path */
        applicationPrint3D: string;
        /** Console application path */
        applicationConsole: string;
        /** Picture View application path */
        applicationPictureView: string;
    }

    /** System-wide paths */
    const system: SystemPaths;

    /** Current user paths (updated via updateUser) */
    const user: UserPaths;

    /**
     * Creates directories for all paths in an object that end with "/"
     * @param paths Object containing path strings
     */
    function create(paths: Record<string, string>): void;

    /**
     * Gets a user paths object for a specific user
     * @param name Username
     * @returns User paths object
     */
    function getUser(name: string): UserPaths;

    /**
     * Updates the global user paths to specified user
     * @param name Username
     */
    function updateUser(name: string): void;
}
/**
 * This library allows a general way of interacting with file system components.
 * @see https://ocdoc.cil.li/api:filesystem
 * @noSelf
 * @noResolution
 */
declare module "filesystem" {
    /**
     * Returns whether autorun is currently enabled.
     */
    function isAutorunEnabled(): boolean;

    /**
     * Sets whether autorun files should be ran on startup.
     */
    function setAutorunEnabled(value: boolean): void;

    /**
     * Returns the canonical form of the specified path, i.e. a path containing no “indirections” such as `.` or `..`
     */
    function canonical(path: string): string;

    /**
     * Returns an array containing one entry for each canonical segment of the given path.
     */
    function segments(path: string): string[];

    /**
     * Concatenates two or more paths.
     */
    function concat(pathA: string, pathB: string, ...args: string[]): string;

    /**
     * Returns the path component of a path to a file,
     * i.e. everything before the last slash in the canonical form of the specified path.
     */
    function path(path: string): string;

    /**
     * Returns the file name component of a path to a file,
     * i.e. everything after the last slash in the canonical form of the specified path.
     */
    function name(path: string): string;

    /**
     * This is similar to component.proxy,
     * except that the specified string may also be a file system component's label.
     * @tupleReturn
     */
    function proxy(filter: string): [any, string];

    /**
     * Mounts a file system at the specified path.
     * @tupleReturn
     */
    function mount(fs: any, path: string): [boolean | null, string];

    /**
     * Returns an iterator function over all currently mounted file system component's proxies
     * and the paths at which they are mounted.
     */
    function mounts(): LuaIterable<[any, string]>;

    /**
     *  Unmounts a file system.
     */
    function umount(fsOrPath: any): boolean;

    /**
     * Checks if the object at the specified path is a symlink,
     * if so returns the path to where it links.
     * @tupleReturn
     */
    function isLink(path: string): [boolean, string | null];

    /**
     * Creates a symbolic link to the specified target path at the specified path.
     * @tupleReturn
     */
    function link(target: string, linkpath: string): [boolean | null, string];

    /**
     * Gets the file system component's proxy that contains the specified path.
     * Returns the proxy and mount path, or `null` and an error message.
     * @tupleReturn
     */
    function get(path: string): [any, string];

    /**
     * Checks whether a file or folder exist at the specified path.
     */
    function exists(path: string): boolean;

    /**
     * Gets the file size of the file at the specified location.
     * Returns 0 if the path points to anything other than a file.
     */
    function size(path: string): number;

    /**
     * Gets whether the path points to a directory.
     * Returns false if not, either because the path points to a file, or `file.exists(path)` is false.
     */
    function isDirectory(path: string): boolean;

    /**
     * Returns the real world unix timestamp of the last time the file at the specified path was modified.
     * For directories this is usually the time of their creation.
     */
    function lastModified(path: string): number;

    /**
     * Returns an iterator over all elements in the directory at the specified path.
     * Returns null and an error messages if the path is invalid or some other error occurred.
     * @tupleReturn
     */
    function list(path: string): [LuaIterable<string> | null, string];

    /**
     * Creates a new directory at the specified path.
     * Creates any parent directories that do not exist yet, if necessary.
     * Returns true on success, null and an error message otherwise.
     * @tupleReturn
     */
    function makeDirectory(path: string): [true | null, string];

    /**
     * Deletes a file or folder. If the path specifies a folder,
     * deletes all files and subdirectories in the folder, recursively.
     * Return true on success, null and an error message otherwise.
     * @tupleReturn
     */
    function remove(path: string): [true | null, string];

    /**
     * Renames a file or folder.
     * If the paths point to different file system components this will only work for files,
     * because it actually perform a copy operation, followed by a deletion if the copy succeeds.
     * Returns true on success, null and an error message otherwise.
     * @tupleReturn
     */
    function rename(oldPath: string, newPath: string): [true | null, string];
}

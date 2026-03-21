/**
 * Advanced filesystem operations with mounting and virtual filesystem support
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Filesystem-API
 * @noSelf
 * @noResolution
 */
declare module "Filesystem" {
    /**
     * File handle for reading/writing operations
     */
    interface FileHandle {
        proxy: any
        stream: any
        position: number
        buffer: string

        /**
         * Closes the file handle
         * @returns Success status and optional error message
         */
        close(): LuaMultiReturn<[true] | [false, string]>

        /**
         * Seeks to position in file
         * @param whence Seek mode: "set", "cur", or "end"
         * @param offset Offset from whence position
         * @returns New position or error message
         */
        seek(whence: "set" | "cur" | "end", offset: number): LuaMultiReturn<[number] | [undefined, string]>

        /**
         * Reads specified number of characters
         * @param count Number of characters to read
         * @returns Read data or undefined on EOF
         */
        readString?(count: number): string | undefined

        /**
         * Reads a single Unicode character
         * @returns Unicode character
         */
        readUnicodeChar?(): string

        /**
         * Reads bytes as number
         * @param count Number of bytes to read (1-8)
         * @param littleEndian Use little-endian byte order
         * @returns Number value or undefined on EOF
         */
        readBytes?(count: number, littleEndian?: boolean): number | undefined

        /**
         * Reads a line from file
         * @returns Line without a newline character, or undefined on EOF
         */
        readLine?(): string | undefined

        /**
         * Reads entire file content
         * @returns File content
         */
        readAll?(): string

        /**
         * Reads data in specified format
         * @param format Format: number (bytes), "a" (all), "l" (line), "b" (byte), "u" (Unicode), "bs" (bytes as number)
         * @param args Additional arguments for "bs" format
         * @returns Read data
         */
        read?(format: number | "a" | "l" | "b" | "u" | "bs", ...args: any[]): any

        /**
         * Returns iterator for reading lines
         * @returns Iterator function
         */
        lines?(): () => string | undefined

        /**
         * Writes data to file
         * @param data Data to write (will be converted to string)
         * @returns Success status and optional error message
         */
        write?(...data: any[]): LuaMultiReturn<[true] | [false, string]>

        /**
         * Writes bytes to file
         * @param bytes Byte values to write
         * @returns Success status and optional error message
         */
        writeBytes?(...bytes: number[]): LuaMultiReturn<[true] | [false, string]>
    }

    /** Sorting method: Sort by name */
    const SORTING_NAME = 1
    /** Sorting method: Sort by type */
    const SORTING_TYPE = 2
    /** Sorting method: Sort by date */
    const SORTING_DATE = 3

    /**
     * Gets a path component (directory) from full path
     * @param path Full path
     * @returns Directory path
     */
    function path(path: string): string

    /**
     * Gets a filename component from full path
     * @param path Full path
     * @returns Filename
     */
    function name(path: string): string

    /**
     * Gets file extension from path
     * @param path File path
     * @param lower Return lowercase extension
     * @returns Extension including dot, or undefined
     */
    function extension(path: string, lower?: boolean): string | undefined

    /**
     * Removes extension from filename
     * @param path File path
     * @returns Path without extension
     */
    function hideExtension(path: string): string

    /**
     * Checks if a path represents a hidden file (starts with dot)
     * @param path File path
     * @returns True if hidden
     */
    function isHidden(path: string): boolean

    /**
     * Removes redundant slashes from path
     * @param path File path
     * @returns Normalized path
     */
    function removeSlashes(path: string): string

    /**
     * Mounts a filesystem proxy at specified path
     * @param proxy Filesystem component proxy
     * @param path Mount point path
     * @returns Success status and optional error message
     */
    function mount(proxy: any, path: string): LuaMultiReturn<[true] | [false, string]>

    /**
     * Unmounts a filesystem proxy or path
     * @param proxyOrAddress Filesystem proxy or component address
     * @returns Success status and optional error message
     */
    function unmount(proxyOrAddress: any | string): LuaMultiReturn<[true] | [false, string]>

    /**
     * Gets filesystem proxy and relative path for given absolute path
     * @param path Absolute path
     * @returns Filesystem proxy and relative path
     */
    function get(path: string): LuaMultiReturn<[any, string]>

    /**
     * Returns iterator over mounted filesystems
     * @returns Iterator yielding (proxy, mountPath) pairs
     */
    function mounts(): LuaIterable<LuaMultiReturn<[any, string]>>

    /**
     * Opens a file for reading or writing
     * @param path File path
     * @param mode File mode: "r", "rb", "w", "wb", "a", "ab"
     * @returns File handle or error message
     */
    function open(path: string, mode: "r" | "rb" | "w" | "wb" | "a" | "ab"): LuaMultiReturn<[FileHandle] | [undefined, string]>

    /**
     * Checks if path exists
     * @param path File path
     * @returns True if exists
     */
    function exists(path: string): boolean

    /**
     * Gets file size in bytes
     * @param path File path
     * @returns Size in bytes
     */
    function size(path: string): number

    /**
     * Checks if path is a directory
     * @param path File path
     * @returns True if directory
     */
    function isDirectory(path: string): boolean

    /**
     * Creates a directory and all parent directories
     * @param path Directory path
     * @returns Success status and optional error message
     */
    function makeDirectory(path: string): LuaMultiReturn<[true] | [false, string]>

    /**
     * Gets last modification time in milliseconds since epoch
     * @param path File path
     * @returns Timestamp in milliseconds
     */
    function lastModified(path: string): number

    /**
     * Removes file or directory recursively
     * @param path File path
     * @returns Success status and optional error message
     */
    function remove(path: string): LuaMultiReturn<[true] | [false, string]>

    /**
     * Lists files in directory
     * @param path Directory path
     * @param sortingMethod Sorting method (SORTING_NAME, SORTING_TYPE, SORTING_DATE)
     * @returns Array of filenames or error message
     */
    function list(path: string, sortingMethod?: number): LuaMultiReturn<[string[]] | [undefined, string]>

    /**
     * Renames or moves a file
     * @param fromPath Source path
     * @param toPath Destination path
     * @returns Success status and optional error message
     */
    function rename(fromPath: string, toPath: string): LuaMultiReturn<[true] | [false, string]>

    /**
     * Copies file or directory recursively
     * @param fromPath Source path
     * @param toPath Destination path
     */
    function copy(fromPath: string, toPath: string): void

    /**
     * Reads an entire file as string
     * @param path File path
     * @returns File content or error
     */
    function read(path: string): LuaMultiReturn<[string] | [false, string]>

    /**
     * Returns iterator for reading file lines
     * @param path File path
     * @returns Iterator function yielding lines
     */
    function lines(path: string): () => string | undefined

    /**
     * Reads all lines from a file into array
     * @param path File path
     * @returns Array of lines or error
     */
    function readLines(path: string): LuaMultiReturn<[string[]] | [false, string]>

    /**
     * Writes data to file, creating directories if needed
     * @param path File path
     * @param data Data to write (converted to string)
     * @returns Success status and optional error message
     */
    function write(path: string, ...data: any[]): LuaMultiReturn<[true] | [false, string]>

    /**
     * Appends data to file
     * @param path File path
     * @param data Data to append (converted to string)
     * @returns Success status and optional error message
     */
    function append(path: string, ...data: any[]): LuaMultiReturn<[true] | [false, string]>

    /**
     * Serializes and writes table to file
     * @param path File path
     * @param data Table to serialize
     * @returns Success status and optional error message
     */
    function writeTable(path: string, data: any): LuaMultiReturn<[true] | [false, string]>

    /**
     * Reads and deserializes table from file
     * @param path File path
     * @returns Deserialized table or error
     */
    function readTable(path: string): LuaMultiReturn<[any] | [undefined, string]>

    /**
     * Sets the boot filesystem proxy
     * @param proxy Filesystem component proxy
     */
    function setProxy(proxy: any): void

    /**
     * Gets the boot filesystem proxy
     * @returns Filesystem component proxy
     */
    function getProxy(): any
}
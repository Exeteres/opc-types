/**
 * Low-level FTP client library.
 *
 * @noSelf
 * @noResolution
 */
declare module "FTP" {
    /**
     * Iterates over CRLF-delimited lines in an FTP response string.
     * @param data Raw FTP response string
     * @returns Iterator yielding each line without its trailing CRLF
     */
    function lines(data: string): LuaIterable<string>

    /**
     * Parses an FTP modification-time string (format `YYYYMMDDHHmmSS`) into a Unix timestamp.
     * @param timestamp FTP modification time string
     * @returns Unix timestamp
     */
    function parseTimestamp(timestamp: string): number

    /**
     * Parses a single MLSD/MLST fact line into a file-info table.
     * @param fileInfo MLSD/MLST fact line (e.g. `"type=file;size=1234;modify=20240101120000; readme.txt"`)
     * @returns Parsed file info object
     */
    function parseFileInfo(fileInfo: string): {
        name: string
        isdir: boolean
        size: number
        modify: number
    }

    /** Active FTP session returned by {@link connect}. */
    interface Session {
        /**
         * Receives and parses the next server response.
         * @returns Parsed response object, or `undefined` and a reason string on failure
         */
        receiveResponse(): LuaMultiReturn<[{ status: number; ok: boolean; content: string }] | [undefined, string]>

        /**
         * Sends one or more commands and receives the response.
         * Pass an array to pipeline multiple commands in one request.
         * @param command Single command string or array of commands
         * @returns Parsed response object, or `undefined` and a reason string on failure
         */
        sendCommand(
            command: string | string[]
        ): LuaMultiReturn<[{ status: number; ok: boolean; content: string }] | [undefined, string]>

        /**
         * Enters PASV mode, sends a command, and reads the data channel response.
         * @param command FTP command to send after entering passive mode
         * @returns Data channel response string, or `undefined` and a reason string on failure
         */
        sendPassiveModeCommand(
            command: string
        ): LuaMultiReturn<[string] | [undefined, string]>

        /**
         * Opens a PASV data connection.
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        beginNegotiation(): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Closes the PASV data connection.
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        endNegotiation(): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Reads all pending data from the open data channel.
         * @returns Received data string, or `undefined` and a reason string on failure
         */
        receiveData(): LuaMultiReturn<[string] | [undefined, string]>

        /**
         * Writes data through the open data channel.
         * @param data Data to send
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        sendData(data: string): LuaMultiReturn<[boolean] | [undefined, string]>

        /**
         * Closes both the control and data sockets.
         */
        close(): void

        /**
         * Stores a value in the session cache under the given key.
         * Pass `undefined` as value to invalidate the entry.
         * @param key Cache key
         * @param value Value to store, or `undefined` to remove
         */
        setCacheValue(key: string, value: unknown): void

        /**
         * Retrieves a cached value, evicting stale entries first.
         * @param key Cache key
         * @returns Cached value, or `undefined` if not present or expired
         */
        getCacheValue(key: string): unknown

        /**
         * Sends a PWD command to keep the control connection alive.
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        keepAlive(): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Authenticates with the server using the given credentials.
         * @param username FTP username
         * @param password FTP password
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        login(
            username: string,
            password: string
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Sets the transfer mode (`"A"` for ASCII, `"I"` for binary).
         * Always use `"I"` for binary file transfers.
         * @param mode Transfer mode character
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        setMode(mode: string): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Returns the current working directory path.
         * @param useCache Whether to return a cached result if available
         * @returns Current directory path, or `undefined` and a reason string on failure
         */
        getWorkingDirectory(
            useCache?: boolean
        ): LuaMultiReturn<[string] | [undefined, string]>

        /**
         * Changes the current working directory.
         * @param path Remote directory path to switch to
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        changeWorkingDirectory(
            path: string
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Returns the size in bytes of a remote file.
         * @param path Remote file path
         * @returns File size in bytes, or `undefined` and a reason string on failure
         */
        getFileSize(
            path: string
        ): LuaMultiReturn<[number] | [undefined, string]>

        /**
         * Resolves a relative path against the current working directory.
         * Absolute paths are returned unchanged.
         * @param path Remote path (relative or absolute)
         * @param useCache Whether to use a cached working directory
         * @returns Resolved absolute path, or `undefined` and a reason string on failure
         */
        resolvePath(
            path: string,
            useCache?: boolean
        ): LuaMultiReturn<[string] | [undefined, string]>

        /**
         * Batch-requests type, size, and modification time for a list of remote paths.
         * @param fileNames List of remote paths to query
         * @returns Array of file info objects, or `undefined` and a reason string on failure
         */
        requestFilesInformation(
            fileNames: string[]
        ): LuaMultiReturn<
            [Array<{ name: string; isdir: boolean; size: number; modify: number }>]
            | [undefined, string]
        >

        /**
         * Lists entries of a remote directory with full metadata.
         * Uses MLSD if the server supports it, falling back to NLST.
         * @param path Remote directory path
         * @param useCache Whether to return a cached listing if available
         * @returns Array of file info objects sorted by name, or `undefined` and a reason string on failure
         */
        listDirectory(
            path: string,
            useCache?: boolean
        ): LuaMultiReturn<
            [Array<{ name: string; isdir: boolean; size: number; modify: number }>]
            | [undefined, string]
        >

        /**
         * Returns metadata for a single remote path.
         * Uses MLST if the server supports it, falling back to a batch request.
         * @param path Remote file or directory path
         * @param useCache Whether to return a cached result if available
         * @returns File info object, or `undefined` and a reason string on failure
         */
        getFileInfo(
            path: string,
            useCache?: boolean
        ): LuaMultiReturn<
            [{ name: string; isdir: boolean; size: number; modify: number }]
            | [undefined, string]
        >

        /**
         * Returns whether a remote path exists.
         * @param path Remote path to check
         * @param useCache Whether to use a cached directory listing if available
         * @returns `true` if the path exists, `false` if not, or `undefined` and a reason string on failure
         */
        fileExists(
            path: string,
            useCache?: boolean
        ): LuaMultiReturn<[boolean] | [undefined, string]>

        /**
         * Deletes a remote file, or recursively deletes a remote directory.
         * @param path Remote path to delete
         * @param useCache Whether to use cached metadata when determining entry type
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        removeFile(
            path: string,
            useCache?: boolean
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Creates a remote directory.
         * @param path Remote directory path to create
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        makeDirectory(
            path: string
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Renames or moves a remote file.
         * @param from Source remote path
         * @param to Destination remote path
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        renameFile(
            from: string,
            to: string
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Downloads a remote file, invoking `callback` for each received chunk.
         * @param path Remote file path
         * @param callback Function called with each data chunk
         * @param chunkSize Maximum bytes to read per chunk (default: unlimited)
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        readFile(
            path: string,
            callback: (chunk: string) => void,
            chunkSize?: number
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Downloads a remote file entirely into memory and returns it as a string.
         * @param path Remote file path
         * @returns File contents as a string, or `undefined` and a reason string on failure
         */
        readFileToMemory(
            path: string
        ): LuaMultiReturn<[string] | [undefined, string]>

        /**
         * Downloads a remote file and saves it to the local filesystem.
         * @param path Remote file path
         * @param savePath Local destination path
         * @returns `true` on success, or `false` and a reason string on failure
         */
        readFileToFilesystem(
            path: string,
            savePath: string
        ): LuaMultiReturn<[true] | [false, string]>

        /**
         * Uploads data to a remote path.
         * `callback` is called repeatedly and must return the next chunk to send,
         * or `undefined` to signal end of data.
         * @param path Remote destination path
         * @param callback Data provider function
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        writeFile(
            path: string,
            callback: () => string | undefined
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Uploads a string as a remote file.
         * @param path Remote destination path
         * @param data File contents to upload
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        writeFileFromMemory(
            path: string,
            data: string
        ): LuaMultiReturn<[true] | [undefined, string]>

        /**
         * Uploads a local file to a remote path.
         * @param path Remote destination path
         * @param localPath Local source file path
         * @returns `true` on success, or `undefined` and a reason string on failure
         */
        writeFileFromFilesystem(
            path: string,
            localPath: string
        ): LuaMultiReturn<[true] | [undefined, string]>
    }

    /**
     * Connects to an FTP server and returns a {@link Session}.
     * @param address Hostname or IP address of the FTP server
     * @param port Control port (default: 21)
     * @param responseTimeout Seconds to wait for server responses (default: 1)
     * @returns A {@link Session} object, or `undefined` and a reason string on failure
     */
    function connect(
        address: string,
        port?: number,
        responseTimeout?: number
    ): LuaMultiReturn<[Session] | [undefined, string]>
}

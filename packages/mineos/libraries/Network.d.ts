/**
 * Library for interacting with network interfaces.
 *
 * @noSelf
 * @noResolution
 */
declare module "Network" {
  /**
   * Filesystem proxy for a remote FTP server, mountable via `filesystem.mount()`.
   */
  interface FTPProxy {
    readonly type: "filesystem"
    /** Formatted as `"user@host:port"` */
    readonly address: string
    readonly slot: 0
    readonly networkFTP: true

    /** @returns The proxy label (`"user@host:port"`) */
    getLabel(): string

    /**
     * Sets a custom display label.
     * @param text New label
     */
    setLabel(text: string): true

    /** @returns Always `false` — FTP mounts are read-write */
    isReadOnly(): false

    /** @returns Approximate bytes used on the remote server */
    spaceUsed(): number

    /** @returns Configured total space quota */
    spaceTotal(): number

    /**
     * Lists entries in a remote directory directories have a trailing `/`.
     * @param path Remote directory path
     */
    list(path: string): string[]

    /**
     * @param path Remote path
     * @returns `true` if the path is a directory
     */
    isDirectory(path: string): boolean

    /**
     * @param path Remote path
     * @returns Last-modified timestamp
     */
    lastModified(path: string): number

    /**
     * @param path Remote path
     * @returns File size in bytes
     */
    size(path: string): number

    /**
     * @param path Remote path
     * @returns `true` if the path exists
     */
    exists(path: string): boolean

    /**
     * Opens a remote file via a local temporary copy.
     * @param path Remote file path
     * @param mode Standard Lua file mode (`"r"`, `"rb"`, `"w"`, `"wb"`, `"a"`, `"ab"`)
     * @returns File handle, or `nil, reason` on failure
     */
    open(path: string, mode: string): LuaMultiReturn<[object] | [null, string]>

    /**
     * Closes the handle, uploading the file if opened for writing.
     * @param handle File handle from {@link open}
     */
    close(handle: object): void

    /**
     * @param handle File handle
     * @param data Data to write
     */
    write(handle: object, data: string): boolean

    /**
     * @param handle File handle
     * @param count Bytes to read
     */
    read(handle: object, count: number): LuaMultiReturn<[string] | [null]>

    /**
     * @param handle File handle
     * @param whence Seek mode (`"set"`, `"cur"`, `"end"`)
     * @param offset Byte offset
     */
    seek(handle: object, whence: string, offset: number): number

    /**
     * Deletes a remote file.
     * @param path Remote path
     */
    remove(path: string): boolean

    /**
     * Creates a remote directory.
     * @param path Remote path
     */
    makeDirectory(path: string): boolean

    /**
     * Renames / moves a remote file.
     * @param from Source path
     * @param to Destination path
     */
    rename(from: string, to: string): boolean

    /** Sends a keepalive, unmounts the proxy, and closes the FTP connection. */
    closeSocketHandle(): boolean
  }

  /**
   * Filesystem proxy for a remote computer reached over a modem, mountable via `filesystem.mount()`.
   */
  interface ModemProxy {
    readonly type: "filesystem"
    /** OC component address of the remote computer */
    readonly address: string
    readonly slot: 0
    readonly networkModem: true
    /** Optional human-readable name broadcast by the remote computer */
    name?: string

    /** @returns Remote filesystem label */
    getLabel(): string

    /** @returns `true` if the remote filesystem is read-only */
    isReadOnly(): boolean

    /** @returns Bytes used on the remote filesystem */
    spaceUsed(): number

    /** @returns Total capacity of the remote filesystem */
    spaceTotal(): number

    /**
     * @param name New label
     */
    setLabel(name: string): boolean

    /**
     * @param path Remote path
     */
    exists(path: string): boolean

    /**
     * @param path Remote path
     */
    isDirectory(path: string): boolean

    /**
     * @param path Remote path
     */
    makeDirectory(path: string): boolean

    /**
     * @param path Remote path
     */
    remove(path: string): boolean

    /**
     * @param path Remote path
     */
    lastModified(path: string): number

    /**
     * @param path Remote path
     */
    size(path: string): number

    /**
     * @param path Remote path
     */
    list(path: string): string[]

    /**
     * @param from Source path
     * @param to Destination path
     */
    rename(from: string, to: string): boolean

    /**
     * @param path Remote path
     * @param mode Standard Lua file mode
     * @returns Remote file handle ID, or `false, reason` on failure
     */
    open(path: string, mode: string): LuaMultiReturn<[number] | [false, string]>

    /**
     * @param handle Handle ID from {@link open}
     */
    close(handle: number): boolean

    /**
     * @param handle Handle ID
     * @param whence Seek mode
     * @param offset Byte offset
     */
    seek(handle: number, whence: string, offset: number): number

    /**
     * @param handle Handle ID
     * @param count Bytes to read
     */
    read(handle: number, count: number): string

    /**
     * Writes data, automatically splitting across multiple packets if needed.
     * @param handle Handle ID
     * @param data Data to write
     */
    write(handle: number, data: string): boolean
  }

  /**
   * Open file handles keyed by numeric ID, used by the server-side request handler.
   */
  const filesystemHandles: Record<number, object>

  /** Active modem component proxy, or `nil` if unavailable. */
  let modemProxy: object | null
  /** UDP port used for all modem network traffic (default `1488`). */
  let modemPort: number
  /** Bytes reserved per packet for protocol overhead (default `128`). */
  let modemPacketReserve: number
  /** Seconds to wait for a modem response before timing out (default `2`). */
  let modemTimeout: number

  /** Active internet component proxy, or `nil` if unavailable. */
  let internetProxy: object | null
  /** Delay between internet poll attempts in seconds (default `0.05`). */
  let internetDelay: number
  /** Seconds to wait for an internet response (default `1`). */
  let internetTimeout: number

  /** Reported used space for virtual proxy drives (default `0`). */
  let proxySpaceUsed: number
  /** Reported total space for virtual proxy drives (default `1 GiB`). */
  let proxySpaceTotal: number

  /**
   * Detects modem/internet components and updates {@link modemProxy} / {@link internetProxy}.
   */
  function updateComponents(): void

  /** Unmounts all currently mounted FTP proxies. */
  function unmountFTPs(): void

  /**
   * Returns the canonical proxy label for an FTP connection (`"user@host:port"`).
   * @param address FTP server hostname or IP
   * @param port FTP control port
   * @param user FTP username
   */
  function getFTPProxyName(address: string, port: number, user: string): string

  /**
   * Connects to an FTP server and returns a mountable filesystem proxy.
   * @param address FTP server hostname or IP
   * @param port FTP control port
   * @param user FTP username
   * @param password FTP password
   * @returns {@link FTPProxy}, or `false, reason` on failure
   */
  function connectToFTP(
    address: string,
    port: number,
    user: string,
    password: string
  ): LuaMultiReturn<[FTPProxy] | [false, string]>

  /** Unmounts all currently mounted modem proxies. */
  function unmountModems(): void

  /**
   * Returns a human-readable label for a modem proxy.
   * @param proxy Modem proxy instance
   * @returns `proxy.name (address)` or just `address` if name is unset
   */
  function getModemProxyName(proxy: ModemProxy): string

  /**
   * Finds a mounted modem proxy by remote component address.
   * @param address Remote component address
   * @returns Matching {@link ModemProxy}, or `undefined` if not mounted
   */
  function getMountedModemProxy(address: string): ModemProxy | undefined

  /**
   * Sends a unicast modem message on {@link modemPort}.
   * @param address Destination component address
   * @param args Message arguments
   * @returns `true`, or `false, reason` if modem is unavailable
   */
  function sendMessage(
    address: string,
    ...args: unknown[]
  ): LuaMultiReturn<[true] | [false, string]>

  /**
   * Broadcasts a modem message to all listeners on {@link modemPort}.
   * @param args Message arguments
   * @returns `true`, or `false, reason` if modem is unavailable
   */
  function broadcastMessage(
    ...args: unknown[]
  ): LuaMultiReturn<[true] | [false, string]>

  /**
   * Sets the wireless modem transmission strength.
   * @param strength Signal strength value
   * @returns `true`, or `false, reason` on failure
   */
  function setSignalStrength(
    strength: number
  ): LuaMultiReturn<[true] | [false, string]>

  /**
   * Broadcasts the local computer's availability state to the network.
   * @param state `true` = available, `false` = going offline
   * @returns `true`, or `false, reason` if modem is unavailable
   */
  function broadcastComputerState(
    state: boolean
  ): LuaMultiReturn<[true] | [false, string]>

  /**
   * Reinitializes the network subsystem from current user settings.
   */
  function update(): void

  /** Disables networking, persists the setting, and calls {@link update}. */
  function disable(): void

  /** Enables networking, persists the setting, and calls {@link update}. */
  function enable(): void
}

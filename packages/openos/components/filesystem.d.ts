declare namespace OpenOS {
    /**
     * This component is provided by Floppy Disks or Hard Disk Drives in Managed mode (for Unmanaged mode, see Drive)
     * @see https://ocdoc.cil.li/component:filesystem
     * @noSelf
     */
    interface Filesystem {
        /**
         * The currently used capacity of the file system, in bytes.
         */
        spaceUsed(): number;

        /**
         * Opens a new file descriptor and returns its handle.
         */
        open(path: string, mode: string): number;

        /**
         * Seeks in an open file descriptor with the specified handle. Returns the new pointer position.
         */
        seek(handle: number, whence: string, offset: number): number;

        /**
         * Creates a directory at the specified absolute path in the file system. Creates parent directories, if necessary.
         */
        makeDirectory(path: string): boolean;

        /**
         * Returns whether an object exists at the specified absolute path in the file system.
         */
        exists(path: string): boolean;

        /**
         * Returns whether the file system is read-only.
         */
        isReadOnly(): boolean;

        /**
         * Writes the specified data to an open file descriptor with the specified handle.
         */
        write(handle: number, value: string): boolean;

        /**
         * The overall capacity of the file system, in bytes.
         */
        spaceTotal(): number;

        /**
         * Returns whether the object at the specified absolute path in the file system is a directory.
         */
        isDirectory(path: string): boolean;

        /**
         * Renames/moves an object from the first specified absolute path in the file system to the second.
         */
        rename(from: string, to: string): boolean;

        /**
         * Returns a list of names of objects in the directory at the specified absolute path in the file system.
         */
        list(path: string): string[];

        /**
         * Returns the (real world) timestamp of when the object at the specified absolute path in the file system was modified.
         */
        lastModified(path: string): number;

        /**
         * Get the current label of the file system.
         */
        getLabel(): string;

        /**
         * Removes the object at the specified absolute path in the file system.
         */
        remove(path: string): boolean;

        /**
         * Closes an open file descriptor with the specified handle.
         */
        close(handle: number): void;

        /**
         * Returns the size of the object at the specified absolute path in the file system.
         */
        size(path: string): number;

        /**
         * Reads up to the specified amount of data from an open file descriptor with the specified handle.
         * Returns nil when EOF is reached.
         */
        read(handle: number, count: number): string | null;

        /**
         * Sets the label of the file system. Returns the new value, which may be truncated.
         */
        setLabel(value: string): string;
    }
}

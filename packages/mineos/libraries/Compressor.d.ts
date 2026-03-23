/**
 * File compression and archiving library using OCAF (OpenComputers Archive Format)
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Compressor-API
 * @noSelf
 * @noResolution
 */
declare module "Compressor" {
    /**
     * Buffer size for reading files during compression/decompression
     */
    let readBufferSize: number

    /**
     * Table of filenames to ignore during packing (e.g., .icons)
     */
    let ignoredFiles: Record<string, boolean>

    /**
     * Packs files and directories into an archive
     * @param archivePath Path where archive will be created
     * @param fileList Single file path or array of paths to pack
     * @returns Success status and optional error message
     */
    function pack(archivePath: string, fileList: string | string[]): LuaMultiReturn<[true] | [false, string]>

    /**
     * Unpacks an archive to specified directory
     * @param archivePath Path to archive file
     * @param unpackPath Destination directory for extracted files
     * @returns Success status and optional error message
     */
    function unpack(archivePath: string, unpackPath: string): LuaMultiReturn<[true] | [false, string]>
}
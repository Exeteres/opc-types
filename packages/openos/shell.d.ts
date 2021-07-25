/**
 * This API provides shell related functionality, such as the current working directory,
 * program search path and aliases for the shell.
 * @see https://ocdoc.cil.li/api:shell
 * @noSelf
 * @noResolution
 */
declare module "shell" {
    /**
     * Gets the value of a specified alias, if any.
     * If there is no such alias returns `null`.
     */
    function getAlias(alias: string): string;

    /**
     * Defines a new alias or updates an existing one.
     * Pass `null` as the value to remove an alias.
     */
    function setAlias(alias: string, value: string | null): void;

    /**
     * @returns Iterator over all known aliases.
     */
    function aliases(): LuaIterable<any>;

    /**
     * Gets the path to the current working directory.
     */
    function getWorkingDirectory(): string;

    /**
     * Sets the current working directory.
     */
    function setWorkingDirectory(dir: string): void;

    /**
     * Gets the search path used by `shell.resolve`.
     * This can contain multiple paths, separated by colons (`:`).
     */
    function getPath(): string;

    /**
     * Sets the search path.
     */
    function setPath(value: string): void;

    /**
     * Tries to “resolve” a path, optionally also checking for files with the specified extension.
     * In this case path would only contain the name.
     */
    function resolve(path: string, ext?: string): string;

    /**
     * Runs the specified command.
     */
    function execute<T extends any[] = any[]>(command: string, env?: any, ...args: string[]): [boolean, ...T];

    /**
     * Utility methods intended for programs to parse their arguments.
     * Will return two tables, the first one containing any “normal” parameters, the second containing “options”.
     */
    function parse(...args: string[]): [any, string[]];
}

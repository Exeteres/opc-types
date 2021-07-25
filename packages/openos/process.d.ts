/**
 * This API provides rudimentary process management.
 * @see https://ocdoc.cil.li/api:process
 * @noSelf
 * @noResolution
 */
declare module "process" {
    /**
     * Loads a Lua script from the specified absolute path and sets it up as a process.
     */
    function load(path: string, env?: any, init?: Function, name?: string): LuaThread;

    /**
     * Returns a table containing the command and path of the specified process, and some other data.
     * The level can optionally be provided to get parent processes.
     * It defaults to 1, the current program. 2 is the current program's parent and so on.
     */
    function info(level?: number): any;
}

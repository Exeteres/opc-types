/**
 * This API mainly provides information about the computer a Lua state is running on, such as its address and uptime.
 * It also contains functions for user management.
 * @see https://ocdoc.cil.li/api:computer
 * @noSelf
 * @noResolution
 */
declare module "computer" {
    /**
     * The component address of this computer.
     */
    function address(): string;

    /**
     * The component address of the computer's temporary file system (if any), used for mounting it on startup.
     */
    function tmpAddress(): string;

    /**
     * The amount of memory currently unused, in bytes.
     * If this gets close to zero your computer will probably soon crash with an out of memory error.
     */
    function freeMemory(): number;

    /**
     * The total amount of memory installed in this computer, in bytes.
     */
    function totalMemory(): number;

    /**
     * The amount of energy currently available in the network the computer is in.
     * For a robot this is the robot's own energy / fuel level.
     */
    function energy(): number;

    /**
     * The maximum amount of energy that can be stored in the network the computer is in.
     * For a robot this is the size of the robot's internal buffer.
     */
    function maxEnergy(): number;

    /**
     * The time in real world seconds this computer has been running,
     * measured based on the world time that passed since it was started -
     * meaning this will not increase while the game is paused, for example.
     */
    function uptime(): number;

    /**
     * Shuts down the computer.
     * Optionally reboots the computer, if reboot is true, i.e. shuts down,
     * then starts it again automatically.
     */
    function shutdown(reboot?: boolean): void;

    /**
     * Get the address of the filesystem component from which to try to boot first.
     */
    function getBootAddress(): string;

    /**
     * Set the address of the filesystem component from which to try to boot first.
     * Call with nil / no arguments to clear.
     */
    function setBootAddress(address?: string): void;

    /**
     * Returns the current runlevel the computer is in. Current Runlevels in OpenOS are:
     * * S: Single-User mode, no components or filesystems initialized yet
     * * 1: Single-User mode, filesystems and components initialized - OpenOS finished booting
     */
    function runlevel(): string | number;

    /**
     * A list of all users registered on this computer, as a tuple.
     */
    function users(): string[];

    /**
     * Registers a new user with this computer.
     * Returns true if the user was successfully added.
     * Returns nil and an error message otherwise.
     */
    function addUser(name: string): boolean | [null, string];

    /**
     * Unregisters a user from this computer.
     * Returns true if the user was removed, false if they weren't registered in the first place.
     */
    function removeUser(name: string): boolean;

    /**
     * Pushes a new signal into the queue.
     * Signals are processed in a FIFO order.
     * The signal has to at least have a name.
     * Arguments to pass along with it are optional.
     */
    function pushSignal(name: string, ...params: LuaVarArgs<any>): void;

    /**
     * Tries to pull a signal from the queue, waiting up to the specified amount of time before failing and returning nil.
     * If no timeout is specified waits forever.
     * The first returned result is the signal name, following results correspond to what was pushed in pushSignal, for example.
     * @tupleReturn
     */
    function pullSignal<T extends any[]>(timeout?: number): Concat<[string], T>;

    /**
     * Causes the computer to produce a beep sound at frequency Hz for duration seconds.
     * This method is overloaded taking a single string parameter as a pattern of dots and dashes for short and long beeps respectively.
     */
    function beep(frequency: string | number, duration?: number): void;
}

/// <reference types="@opct/common"/>

/**
 * Event handling library for managing callbacks and signal processing with interrupt support
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Event-API
 * @noSelf
 * @noResolution
 */
declare module "Event" {
    /**
     * Event handler object returned by addHandler
     */
    interface Handler {
        callback: (...args: any[]) => void
        times: number
        interval?: number
        nextTriggerTime: number
    }

    /** Whether interrupting is enabled (Ctrl+Alt+C) */
    let interruptingEnabled: boolean

    /** Delay between interrupts in seconds */
    let interruptingDelay: number

    /** Default function called on interrupt */
    let defaultInterruptingFunction: () => void

    /** Function called on interrupt */
    let interruptingFunction: () => void

    /** Key codes that trigger interrupt (Ctrl=29, Alt=56, C=46) */
    const interruptingKeyCodes: Record<number, boolean>

    /** Push a signal to the event queue (alias for computer.pushSignal) */
    const push: typeof computer.pushSignal

    /**
     * Adds an event handler with optional interval and execution count
     * @param callback Function to call on event or timer tick
     * @param interval Optional interval in seconds for periodic calls
     * @param times Optional number of times to call (default: infinite)
     * @returns Handler object that can be used with removeHandler
     */
    function addHandler(
        callback: (...args: any[]) => void,
        interval?: number,
        times?: number
    ): Handler

    /**
     * Removes a registered event handler
     * @param handler Handler object returned from addHandler
     * @returns Success status and optional error message
     */
    function removeHandler(handler: Handler): LuaMultiReturn<[true] | [false, string]>

    /**
     * Gets all registered handlers as a table
     * @returns Table of registered handlers
     */
    function getHandlers(): LuaTable<Handler, true>

    /**
     * Skip the next signal of a specified type in {@link pull}
     * @param signalType Type of signal to skip
     */
    function skip(signalType: string): void

    /**
     * Pulls next event from queue, processing handlers and supporting interrupts
     * @param timeout Optional timeout in seconds
     * @returns Event data as multi-return values (signal type, ...)
     */
    function pull(timeout?: number): LuaMultiReturn<any[]>

    /**
     * Sleeps for specified time using busy-wait concept
     * @param time=0 Time in seconds
     */
    function sleep(time?: number): void
}

/**
 * The Thread API provides a variation of coroutines for openos.
 * A thread is superior to basic coroutines in many ways and, for many workflows,
 * is easier to work with. An openos thread is an autonomous non-blocking detachable process.
 * @see https://ocdoc.cil.li/api:thread
 * @noSelf
 * @noResolution
 */
declare module "thread" {
    /**
     * Starts a new thread executing the function `thread_proc` and returns its thread handle, see Thread Handle API.
     * This method takes an optional `...` which is passed to `thread_proc`. The runtime of the thread continues autonomously.
     */
    function create(thread_proc: Function, ...args: any[]): OpenOS.Thread;

    /**
     * Waits for the array of `threads` to complete.
     * This blocking call can return in `timeout` seconds if provided.
     * Returns success and an error message on failure.
     * A thread is “completed” under multiple conditions, see `t:join()` for details.
     * @tupleReturn
     */
    function waitForAll(threads: OpenOS.Thread[], timeout?: number): [boolean, string];

    /**
     * Waits for any single thread to complete and is otherwise equivalent to `thread.waitForAll()`.
     * @tupleReturn
     */
    function waitForAny(threads: OpenOS.Thread[], timeout?: number): [boolean, string];

    /**
     * Returns the current thread `t` object.
     * The init process does not represent a thread and nothing is returned from
     * this method if called from the init process and not inside any thread.
     */
    function current(): OpenOS.Thread;
}

declare namespace OpenOS {
    type ThreadStatus = "running" | "suspended" | "dead";

    interface Thread {
        /**
         * Resumes (or thaws) a suspended thread.
         * Returns success and an error message on failure.
         * A thread begins its life already in a running state and thus basic thread workflows will not ever need to call `t:resume()`.
         * A “running” thread will autonomously continue until it completes.
         * `t:resume()` is only necessary to resume a thread that has been suspended(`t:suspend()`).
         * Note that because you are not directly resuming the thread any exceptions
         * thrown from the thread are absorbed by the threading library and not exposed to your process.
         * - At this time there is no way to hook in an exception handler
         * for threads but for now event.onError is used to print the error message to “/tmp/event.log”.
         * Please note that currently the hard interrupt exception is only thrown once, and the behavior of a process with threads
         * when a hard interrupt is thrown is unspecified. At this time, any one of the threads or the parent process may take the exception.
         * These details are not part of the specification for threads and any part of this implementation detail may change later.
         *  @tupleReturn
         */
        resume(): [boolean, string];

        /**
         * Suspends (or freezes) a running thread.
         * Returns success and an error message on failure.
         * A “suspended” thread never autonomously wakes up and dies as soon as its parent process (if attached) closes.
         * A suspended thread ignores events.
         * That means any event listeners or timers created inside the thread will not respond to event notifications.
         * Note that threads do not buffer event signals and a suspended thread may miss event signals it was waiting for.
         * For example, if a thread was last waiting on event.pull("modem_message") and is “suspended” and a “modem_message” is received by the computer
         * then the thread will miss the event and never know it happened.
         * Please note that if you suspend a thread that is blocked waiting for an event,
         * it is unspecified which event the thread will receive when it is next resumed.
         * Suspending the current thread causes the thread to immediately yield and does not resume until `t:resume()` is called explicitly elsewhere.
         * @tupleReturn
         */
        suspend(): [boolean, string];

        /**
         * Stabby stab! Kills the thread dead.
         * The thread is terminated and will not continue its thread function.
         * Any event registrations it made will die with it.
         * Keep in mind that the core underlying Lua type is a coroutine which is not a preemptive thread.
         * Thus, the thread's stopping points are deterministic, meaning that you can predict exactly where the thread will stop.
         */
        kill(): void;

        /**
         * Returns the thread status as a string.
         */
        status(): ThreadStatus;

        /**
         * Attaches a thread to a process, conventionally known as a child thread or attached thread.
         * `level` is an optional used to get parent processes, 0 or nil uses the currently running process.
         * When initially created a thread is already attached to the current process.
         * This method returns nil and an error message if level refers to a nonexistent process, otherwise it returns truthy.
         * An attached thread blocks its parent process from closing until the thread dies (or is killed, or the parent process aborts).
         * @tupleReturn
         */
        attach(level?: number): [boolean, string];

        /**
         * Detaches a thread from its parent if it has one.
         * Returns nil and an error message if no action was taken,
         * otherwise returns self (handy if you want to create and detach a thread in one line).
         * A detached thread will continue to run until the computer is shutdown or rebooted, or the thread dies.
         * @tupleReturn
         */
        detach(): [OpenOS.Thread, string];

        /**
         * Blocks the caller until t is no longer running or (optionally) returns false if `timeout` seconds is reached.
         * After a call to `t:join()` the thread state is “dead”.
         * Any of the following circumstances allow join to finish and unblock the caller:
         * - The thread continues running until it returns from its thread function;
         * - The thread aborts, or throws an uncaught exception;
         * - The thread is suspended;
         * - The thread is killed.
         *
         * Calling `thread.waitForAll({t})` is functionally equivalent to calling `t:join()`.
         * When a processs is closing it will call `thread.waitForAll` on the group of its child threads if it has any.
         * A child thread blocks its parent thread by the same machanism.
         * @tupleReturn
         */
        join(timeout?: number): [boolean, string];
    }
}

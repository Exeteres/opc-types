/**
 * This library allows simplifying internet requests, to serialize Lua tables as POST-data, to perform URL-safe encoding, to instantly download or run files on HDD.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Internet-API
 * @noSelf
 * @noResolution
 */
declare module 'Internet' {
    /**
     * Performs a request to a given `url`. By default, request `method` is **GET**, but if `postData` was given and there's no specific `method`, it switches to **POST**.
     *
     * If a specific method was given, then the request method will be just that, regardless of the availability of a `postData`.
     *
     * You can also pass the optional `headers` parameter with "User-Agent" or something else.
     * @returns `string` server response on success, `undefined` and `reason` message otherwise.
     */
    function request(
        url: string,
        postData?: string,
        headers?: Record<string, string>,
        method?: string
    ): LuaMultiReturn<[string] | [undefined, string]>

    /**
     * Downloads a file via given `url` to given `path`.
     * @returns `true` on success, `false` and `string` reason otherwise.
     */
    function download(
        url: string,
        path: string
    ): LuaMultiReturn<[true] | [false, string]>

    /**
     * Returns an {@link https://en.wikipedia.org/wiki/Percent-encoding|percent-encoding} result of given string for URL-safe requests.
     */
    function encode(text: string): string

    /**
     * Serializes an Lua table to URL query string and automatically encodes passed data via {@link encode}.
     */
    function serialize(data: any): string

    /**
     * This method is used by {@link request} and {@link download}. It provides calling of the `chunkHandler` function on every downloaded chunk of data from the server.
     * Every `chunkHandler` call happens with downloading of given `chunkSize` bytes of data. Downloaded `chunk` is being passed as an argument to `chunkHandler`.
     *
     * For example, it's very useful for displaying something on the screen of single-thread computers while processing a large amount of data from a server.
     * Returns `true` on successful finishing request, `false` and `reason` message otherwise.
     */
    function rawRequest(
        url: string,
        postData?: string,
        headers?: Record<string, string>,
        chunkHandler?: (chunk: string) => void,
        chunkSize?: number,
        method?: string
    ): LuaMultiReturn<[true] | [false, string]>
}

/**
 * This library wraps functionality of Internet cards.
 * @see https://ocdoc.cil.li/api:internet
 * @noSelf
 * @noResolution
 */
declare module "internet" {
    /**
     * Sends an HTTP request to the specified URL, with the specified POST data, if any.
     * If no data is specified, a GET request will be made.
     * The POST data can be in one of two formats: if it's a string, it will be sent as-is.
     * If it's a table, it will be converted to a string by assuming that each key is the name of a POST variable,
     * and it's associated value is the value for that variable.
     * Method can be explicitly specified to values such as GET, POST, or PUT.
     */
    function request(url: string, data?: any, headers?: any, method?: string): LuaIterable<any>;

    /**
     * Opens a buffered socket stream to the specified address.
     */
    function open(address: string, port?: number): LuaFile;
}

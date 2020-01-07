declare namespace OpenOS {
    /**
     * This component is provided by the Internet Card.
     * @see https://ocdoc.cil.li/component:internet
     * @noSelf
     */
    interface Internet {
        /**
         * Returns whether TCP connections can be made (config setting).
         */
        isTcpEnabled(): boolean;

        /**
         * Returns whether HTTP requests can be made (config setting).
         */
        isHttpEnabled(): boolean;

        /**
         * Opens a new TCP connection. Returns the handle of the connection.
         */
        connect(address: string, port?: number): TCPSocket;

        /**
         * Sends a new HTTP request. Returns the handle of the connectio
         */
        request(url: string, postData?: string, headers?: any[]): HTTPRequest;
    }

    interface TCPSocket {
        /**
         * Tries to read data from the socket stream. Returns the read byte array.
         */
        read(n?: number): string;

        /**
         * Closes an open socket stream.
         */
        close(): void;

        /**
         * Tries to write data to the socket stream. Returns the number of bytes written.
         */
        write(data: string): number;

        /**
         * Ensures a socket is connected. Errors if the connection failed.
         */
        finishConnect(): boolean;

        /**
         * Returns the id for this socket.
         */
        id(): string;
    }

    interface HTTPRequest {
        /**
         * Tries to read data from the response. Returns the read byte array.
         */
        read(n?: number): string;

        /**
         * Get response code, message and headers.
         * @tupleReturn
         */
        response(): [number, string, any];

        /**
         * Closes an open socket stream.
         */
        close(): void;

        /**
         * Ensures a response is available. Errors if the connection failed.
         */
        finishConnect(): boolean;
    }
}

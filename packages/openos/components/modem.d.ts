declare namespace OpenOS {
    type ModemData = undefined | boolean | number | string;

    /**
     * This component is provided by network cards.
     * @see https://ocdoc.cil.li/component:modem
     * @noSelf
     */
    interface Modem {
        /**
         * Returns whether this modem is capable of sending wireless messages.
         */
        isWireless(): boolean;

        /**
         * Returns the maximum packet size for sending messages via network cards. Defaults to 8192.
         * You can change this in the OpenComputers configuration file.
         * Every value in a message adds two bytes of overhead. (Even if there's only one value.)
         * Numbers add another 8 bytes, true/false/nil another 4 bytes, and strings exactly as many bytes
         * as the string contains—though empty strings still count as one byte.
         */
        maxPacketSize(): number;

        /**
         * Returns whether the specified “port” is currently being listened on.
         * Messages only trigger signals when they arrive on a port that is open.
         */
        isOpen(port: number): boolean;

        /**
         * Opens the specified port number for listening. Returns true if the port was opened,
         * false if it was already open. Note: maximum port is 65535
         */
        open(port: number): boolean;

        /**
         * Closes the specified port (default: all ports). Returns true if ports were closed.
         */
        close(...port: number[]): boolean;

        /**
         * Sends a network message to the specified address. Returns true if the message was sent.
         * This does not mean the message was received, only that it was sent.
         * Any additional arguments are passed along as data.
         */
        send(address: string, port: number, ...data: ModemData[]): boolean;

        /**
         * Sends a broadcast message. This message is delivered to all reachable network cards.
         * Returns true if the message was sent. Note that broadcast messages are not delivered
         * to the modem that sent the message. All additional arguments are passed along as data.
         * @see send
         */
        broadcast(port: number, ...data: ModemData[]): boolean;

        /**
         * The current signal strength to apply when sending messages. Wireless network cards only.
         */
        getStrength(): number;

        /**
         * Sets the signal strength. If this is set to a value larger than zero, sending a message will also generate
         * a wireless message. The higher the signal strength the more energy is required to send messages, though.
         * Wireless network cards only.
         */
        setStrength(value: number): number;

        /**
         * Gets the current wake-up message. When the network card detects the wake message
         * (a string in the first argument of a network packet), on any port and the machine is off,
         * the machine is started. Works for robots, cases, servers, drones, and tablets.
         * Linked Cards provide this same functionality.
         */
        getWakeMessage(): string;

        /**
         * Sets the wake-up message to the specified string. The message matching can be fuzzy (default is false).
         * A fuzzy match ignores additional trailing arguments in the network packet.
         */
        setWakeMessage(message: string, fuzzy?: boolean): string;
    }
}

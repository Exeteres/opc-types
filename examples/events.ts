import { pull, listen } from "event";

// ! Note: you should declare a message type without first parameter (message name) !
type ModemMessage = [string, string, number, number, string];

let [_, __, from, port, ___, message] = pull<ModemMessage>("modem_message");
print(`Got a message from ${from} on port ${port}: ${message}`);

listen<ModemMessage>("modem_message", (_, __, from, port, ___, message) => {
    print(`Got a message from ${from} on port ${port}: ${message}`);
});

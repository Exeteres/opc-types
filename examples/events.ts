import { pull, listen } from "event";

const [_, __, from, port, ___, message] = pull("modem_message");
print(`Got a message from ${from} on port ${port}: ${message}`);

listen("modem_message", (_, __, from, port, ___, message) => {
    print(`Got a message from ${from} on port ${port}: ${message}`);
});

// ! Note: you can use ` import { redstone } from "component"; `
// ! to import a component directly, but it will throw an error if it does not exist!
import * as component from "component";
import { front } from "sides";

// Check for redstone card
if (component.isAvailable("redstone")) {
    const redstone = component.redstone;
    redstone.setOutput(front, 1);
} else {
    print("Redstone card not found");
}

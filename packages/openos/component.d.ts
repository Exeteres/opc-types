/**
 * The component API is used to access and interact with components available to a computer.
 * @see https://ocdoc.cil.li/api:component
 * @noSelf
 * @noResolution
 */
declare module "component" {
    /**
     * Returns the documentation string for the method with
     * the specified name of the component with the specified address, if any.
     */
    function doc(address: string, method: string): string;

    type ComponentList = LuaTupleIterable<string[]>;

    /**
     * Returns a table with all components currently attached to the computer,
     * with address as a key and component type as a value.
     */
    function list(filter?: string, exact?: boolean): ComponentList;

    /**
     * Calls the method with the specified name on the component with the specified address,
     * passing the remaining arguments as arguments to that method.
     * Returns the result of the method call, i.e. the values returned by the method.
     */
    function invoke(
        address: string,
        method: string,
        ...args: LuaVarArgs<any>
    ): any;

    /**
     * Returns a table with the names of all methods provided by the component with the specified address.
     * The names are the keys in the table, the values indicate whether the method is called directly or not.
     */
    function methods(address: string): string[];

    /**
     * Gets a 'proxy' object for a component that provides all methods
     * the component provides as fields, so they can be called more directly.
     */
    function proxy(address: string): any;

    /**
     * Get the component type of the component with the specified address.
     */
    function type(address: string): string;

    /**
     * Return slot number which the component is installed into.
     * Returns -1 if it doesn't otherwise make sense.
     */
    function slot(address: string): string;

    /**
     * Undocumented
     */
    function fields(address: string): string;

    /**
     * Tries to resolve an abbreviated address to a full address.
     * Returns the full address on success, or null and an error message otherwise.
     * Optionally filters by component type.
     */
    function get(
        address: string,
        componentType: "redstone"
    ): OpenOS.Redstone | null;
    function get(address: string, componentType: "drone"): OpenOS.Drone | null;
    function get(
        address: string,
        componentType: "abstract_bus"
    ): OpenOS.AbstractBus | null;
    function get(
        address: string,
        componentType: "access_point"
    ): OpenOS.AccessPoint | null;
    function get(
        address: string,
        componentType: "chunkloader"
    ): OpenOS.Chunkloader | null;
    function get(
        address: string,
        componentType: "computer"
    ): OpenOS.Computer | null;
    function get(
        address: string,
        componentType: "crafting"
    ): OpenOS.Crafting | null;
    function get(address: string, componentType: "data"): OpenOS.Data | null;
    function get(
        address: string,
        componentType: "database"
    ): OpenOS.Database | null;
    function get(address: string, componentType: "debug"): OpenOS.Debug | null;
    function get(address: string, componentType: "drive"): OpenOS.Drive | null;
    function get(
        address: string,
        componentType: "eeprom"
    ): OpenOS.EEPROM | null;
    function get(
        address: string,
        componentType: "experience"
    ): OpenOS.Experience | null;
    function get(
        address: string,
        componentType: "filesystem"
    ): OpenOS.Filesystem | null;
    function get(address: string, componentType: "generator"): Generator | null;
    function get(
        address: string,
        componentType: "geolyzer"
    ): OpenOS.Geolyzer | null;
    function get(address: string, componentType: "gpu"): OpenOS.GPU | null;
    function get(
        address: string,
        componentType: "hologram"
    ): OpenOS.Hologram | null;
    function get(
        address: string,
        componentType: "internet"
    ): OpenOS.Internet | null;
    function get(
        address: string,
        componentType: "modem"
    ): OpenOS.Modem | null;
    function get(address: string, componentType: string): any | null;

    /**
     * Checks if there is a primary component of the specified component type.
     */
    function isAvailable(componentType: OpenOS.Component): boolean;
    function isAvailable(componentType: string): boolean;

    /**
     * Gets the proxy for the primary component of the specified type.
     * Throws an error if there is no primary component of the specified type.
     */
    function getPrimary(componentType: "redstone"): OpenOS.Redstone;
    function getPrimary(componentType: "drone"): OpenOS.Drone;
    function getPrimary(componentType: "abstract_bus"): OpenOS.AbstractBus;
    function getPrimary(componentType: "access_point"): OpenOS.AccessPoint;
    function getPrimary(componentType: "chunkloader"): OpenOS.Chunkloader;
    function getPrimary(componentType: "computer"): OpenOS.Computer;
    function getPrimary(componentType: "crafting"): OpenOS.Crafting;
    function getPrimary(componentType: "data"): OpenOS.Data;
    function getPrimary(componentType: "database"): OpenOS.Database;
    function getPrimary(componentType: "debug"): OpenOS.Debug;
    function getPrimary(componentType: "drive"): OpenOS.Drive;
    function getPrimary(componentType: "eeprom"): OpenOS.EEPROM;
    function getPrimary(componentType: "experience"): OpenOS.Experience;
    function getPrimary(componentType: "filesystem"): OpenOS.Filesystem;
    function getPrimary(componentType: "generator"): Generator;
    function getPrimary(componentType: "geolyzer"): OpenOS.Geolyzer;
    function getPrimary(componentType: "gpu"): OpenOS.GPU;
    function getPrimary(componentType: "hologram"): OpenOS.Hologram;
    function getPrimary(componentType: "internet"): OpenOS.Internet;
    function getPrimary(componentType: "modem"): OpenOS.Modem;
    function getPrimary(componentType: string): any;

    /**
     * Sets a new primary component for the specified component type.
     * The address may be abbreviated, but must be valid if it is not null.
     */
    function setPrimary(componentType: string, address: string): void;

    /**
     * This component represents a Redstone card.
     */
    const redstone: OpenOS.Redstone;

    /**
     * This component represents a Drone.
     */
    const drone: OpenOS.Drone;

    /**
     * This component represents an Abstract Bus.
     */
    const abstract_bus: OpenOS.AbstractBus;

    /**
     * This component represents an Access Point.
     */
    const access_point: OpenOS.AccessPoint;

    /**
     * This component represents a Chunkloader.
     */
    const chunkloader: OpenOS.Chunkloader;

    /**
     * This component represents a Computer.
     */
    const computer: OpenOS.Computer;

    /**
     * This component represents a Crafting.
     */
    const crafting: OpenOS.Computer;

    /**
     * This component represents a Data card.
     */
    const data: OpenOS.Data;

    /**
     * This component represents a Database.
     */
    const database: OpenOS.Database;

    /**
     * This component represents a Debug card.
     */
    const debug: OpenOS.Debug;

    /**
     * This component represents a Drive.
     */
    const drive: OpenOS.Drive;

    /**
     * This component represents an EEPROM.
     */
    const eeprom: OpenOS.EEPROM;

    /**
     * This component represents an Experience upgrade.
     */
    const experience: OpenOS.Experience;

    /**
     * This component represents a Filesystem.
     */
    const filesystem: OpenOS.Filesystem;

    /**
     * This component represents a Generator.
     */
    const generator: OpenOS.Generator;

    /**
     * This component represents a Geolyzer.
     */
    const geolyzer: OpenOS.Geolyzer;

    /**
     * This component represents a GPU.
     */
    const gpu: OpenOS.GPU;

    /**
     * This component represents a Hologram.
     */
    const hologram: OpenOS.Hologram;

    /**
     * This component represents an Internet card.
     */
    const internet: OpenOS.Internet;

    /**
     * This component represents an Network card.
     */
    const modem: OpenOS.Modem;
}

declare namespace OpenOS {
    type Component =
        | "redstone"
        | "drone"
        | "abstract_bus"
        | "access_point"
        | "chunkloader"
        | "computer"
        | "crafting"
        | "data"
        | "database"
        | "debug"
        | "drive"
        | "eeprom"
        | "experience"
        | "filesystem"
        | "generator"
        | "geolyzer"
        | "gpu"
        | "hologram"
        | "internet"
        | "modem";
}

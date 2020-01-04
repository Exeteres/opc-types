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

    /**
     * Returns a table with all components currently attached to the computer,
     * with address as a key and component type as a value.
     */
    function list(filter?: string, exact?: boolean): Function;

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
    function get(address: string, componentType: "redstone"): Redstone | null;
    function get(address: string, componentType: "drone"): Drone | null;
    function get(
        address: string,
        componentType: "abstract_bus"
    ): AbstractBus | null;
    function get(
        address: string,
        componentType: "access_point"
    ): AccessPoint | null;
    function get(
        address: string,
        componentType: "chunkloader"
    ): Chunkloader | null;
    function get(address: string, componentType: "computer"): Computer | null;
    function get(address: string, componentType: "crafting"): Crafting | null;
    function get(address: string, componentType: "data"): Data | null;
    function get(address: string, componentType: "database"): Database | null;
    function get(address: string, componentType: "debug"): Debug | null;
    function get(address: string, componentType: "drive"): Drive | null;
    function get(address: string, componentType: "eeprom"): EEPROM | null;
    function get(
        address: string,
        componentType: "experience"
    ): Experience | null;
    function get(
        address: string,
        componentType: "filesystem"
    ): Filesystem | null;
    function get(address: string, componentType: "generator"): Generator | null;
    function get(address: string, componentType: "geolyzer"): Geolyzer | null;
    function get(address: string, componentType: "gpu"): GPU | null;
    function get(address: string, componentType: "hologram"): Hologram | null;
    function get(address: string, componentType: "internet"): Internet | null;
    function get(address: string, componentType: string): any | null;

    /**
     * Checks if there is a primary component of the specified component type.
     */
    function isAvailable(componentType: Component): boolean;
    function isAvailable(componentType: string): boolean;

    /**
     * Gets the proxy for the primary component of the specified type.
     * Throws an error if there is no primary component of the specified type.
     */
    function getPrimary(componentType: "redstone"): Redstone;
    function getPrimary(componentType: "drone"): Drone;
    function getPrimary(componentType: "abstract_bus"): AbstractBus;
    function getPrimary(componentType: "access_point"): AccessPoint;
    function getPrimary(componentType: "chunkloader"): Chunkloader;
    function getPrimary(componentType: "computer"): Computer;
    function getPrimary(componentType: "crafting"): Crafting;
    function getPrimary(componentType: "data"): Data;
    function getPrimary(componentType: "database"): Database;
    function getPrimary(componentType: "debug"): Debug;
    function getPrimary(componentType: "drive"): Drive;
    function getPrimary(componentType: "eeprom"): EEPROM;
    function getPrimary(componentType: "experience"): Experience;
    function getPrimary(componentType: "filesystem"): Filesystem;
    function getPrimary(componentType: "generator"): Generator;
    function getPrimary(componentType: "geolyzer"): Geolyzer;
    function getPrimary(componentType: "gpu"): GPU;
    function getPrimary(componentType: "hologram"): Hologram;
    function getPrimary(componentType: "internet"): Internet;
    function getPrimary(componentType: string): any;

    /**
     * Sets a new primary component for the specified component type.
     * The address may be abbreviated, but must be valid if it is not null.
     */
    function setPrimary(componentType: string, address: string): void;

    /**
     * This component represents a Redstone card.
     */
    const redstone: Redstone;

    /**
     * This component represents a Drone.
     */
    const drone: Drone;

    /**
     * This component represents an Abstract Bus.
     */
    const abstract_bus: AbstractBus;

    /**
     * This component represents an Access Point.
     */
    const access_point: AccessPoint;

    /**
     * This component represents a Chunkloader.
     */
    const chunkloader: Chunkloader;

    /**
     * This component represents a Computer.
     */
    const computer: Computer;

    /**
     * This component represents a Crafting.
     */
    const crafting: Computer;

    /**
     * This component represents a Data card.
     */
    const data: Data;

    /**
     * This component represents a Database.
     */
    const database: Database;

    /**
     * This component represents a Debug card.
     */
    const debug: Debug;

    /**
     * This component represents a Drive.
     */
    const drive: Drive;

    /**
     * This component represents an EEPROM.
     */
    const eeprom: EEPROM;

    /**
     * This component represents an Experience upgrade.
     */
    const experience: Experience;

    /**
     * This component represents a Filesystem.
     */
    const filesystem: Filesystem;

    /**
     * This component represents a Generator.
     */
    const generator: Generator;

    /**
     * This component represents a Geolyzer.
     */
    const geolyzer: Geolyzer;

    /**
     * This component represents a GPU.
     */
    const gpu: GPU;

    /**
     * This component represents a Hologram.
     */
    const hologram: Hologram;

    /**
     * This component represents an Internet card.
     */
    const internet: Internet;
}

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
    | "internet";

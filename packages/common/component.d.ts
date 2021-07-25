/**
 * The component API is used to access and interact with components available to a computer.
 * @see https://ocdoc.cil.li/api:component
 * @noSelf
 * @noResolution
 */
declare module "component" {
    const component: OC.ComponentApi & OC.ComponentMap;
    export = component;
}

/**
 * Global instance of the Component API.
 *
 * ! Note that it is only available at the EEPROM level and does not work in OpenOS programs.
 */
declare const component: OC.ComponentApi & OC.ComponentMap;

declare namespace OC {
    /** @noSelf */
    interface ComponentApi {
        /**
         * Returns the documentation string for the method with
         * the specified name of the component with the specified address, if any.
         */
        doc(address: string, method: string): string;

        /**
         * Returns a table with all components currently attached to the computer,
         * with address as a key and component type as a value.
         */
        list(filter?: string, exact?: boolean): LuaIterable<LuaMultiReturn<[string, string]>, undefined>;

        /**
         * Calls the method with the specified name on the component with the specified address,
         * passing the remaining arguments as arguments to that method.
         * Returns the result of the method call, i.e. the values returned by the method.
         */
        invoke(address: string, method: string, ...args: any[]): any;

        /**
         * Returns a table with the names of all methods provided by the component with the specified address.
         * The names are the keys in the table, the values indicate whether the method is called directly or not.
         */
        methods(address: string): string[];

        /**
         * Gets a 'proxy' object for a component that provides all methods
         * the component provides as fields, so they can be called more directly.
         */
        proxy(address: string): any;

        /**
         * Get the component type of the component with the specified address.
         */
        type(address: string): string;

        /**
         * Return slot number which the component is installed into.
         * Returns -1 if it doesn't otherwise make sense.
         */
        slot(address: string): string;

        /**
         * Undocumented
         */
        fields(address: string): string;

        /**
         * Tries to resolve an abbreviated address to a full address.
         * Returns the full address on success, or null and an error message otherwise.
         * Optionally filters by component type.
         */
        get<T extends ComponentType>(address: string, componentType: T): ComponentMap[T] | null;
        get(address: string, componentType?: string): object | null;

        /**
         * Checks if there is a primary component of the specified component type.
         */
        isAvailable(componentType: keyof ComponentMap): boolean;
        isAvailable(componentType: string): boolean;

        /**
         * Gets the proxy for the primary component of the specified type.
         * Throws an error if there is no primary component of the specified type.
         */
        getPrimary<T extends ComponentType>(componentType: T): ComponentMap[T];
        getPrimary(componentType: string): any;

        /**
         * Sets a new primary component for the specified component type.
         * The address may be abbreviated, but must be valid if it is not null.
         */
        setPrimary(componentType: ComponentType, address: string): void;
        setPrimary(componentType: string, address: string): void;

        /**
         * Unknown component.
         */
        [component: string]: object;
    }
}

/**
 * This library wraps functionality of Applied Energistics 2.
 * @see https://ocdoc.cil.li/component:applied_energistics
 * @noSelfInFile
 * @noResolution
 */
declare module "applied_energistics_2" {
    /**
     * @noSelf
     */
    interface me_common {
        /**
         * Get a list of tables representing the available CPUs in the network..
         */
        getCpus(): cpu[];

        /**
         * Get a list of known item recipes. These can be used to issue crafting requests..
         */
        getCraftables(filter?: any): craftable[];

        /**
         * Get a list of the stored items in the network.
         */
        getItemsInNetwork(filter?: itemStack): itemStack[];

        /**
         * Store items in the network matching the specified filter in the database with the specified address.
         */
        store(
            filter: any,
            dbAddress: string,
            startSlot: number,
            count: number
        ): boolean;

        /**
         * Get a list of the stored fluids in the network.
         */
        getFluidsInNetwork(): fluid[];

        /**
         * Get the average power injection into the network.
         */
        getAvgPowerInjection(): number;

        /**
         * Get the average power usage of the network.
         */
        getAvgPowerUsage(): number;

        /**
         * Get the idle power usage of the network.
         */
        getIdlePowerUsage(): number;

        /**
         * Get the maximum stored power in the network.
         */
        getMaxStoredPower(): number;

        /**
         * Get the stored power in the network.
         */
        getStoredPower(): number;
    }

    /**
     * @noSelf
     */
    interface me_controller extends me_common {
        /**
         * Returns the amount of stored energy on the connected side.
         */
        getEnergyStored(): number;

        /**
         * Returns the maximum amount of stored energy on the connected side.
         */
        getMaxEnergyStored(): number;

        /**
         * Returns whether this component can have energy extracted from the connected side.
         */
        canExtract(): number;

        /**
         * Returns whether this component can receive energy on the connected side.
         */
        canReceive(): number;
    }

    /**
     * @noSelf
     */
    interface me_interface extends me_common {
        /**
         * Get the configuration of the interface.
         */
        getInterfaceConfiguration(slot: number): itemStack[];

        /**
         * Configure the interface.
         */
        setInterfaceConfiguration(
            slot: number,
            database: string,
            entry: number,
            size: number
        ): boolean;
    }

    /**
     * @noSelf
     */
    interface me_importbus extends me_common {
        /**
         * Get the configuration of the import bus pointing in the specified direction.
         */
        getImportConfiguration(side: number, slot: number): boolean;

        /**
         * Configure the import bus pointing in the specified direction to import item stacks matching the specified descriptor.
         */
        setImportConfiguration(
            side: number,
            slot: number,
            database: string,
            entry: number
        ): boolean;
    }

    /**
     * @noSelf
     */
    interface me_exportbus extends me_common {
        /**
         * Get the configuration of the export bus pointing in the specified direction.
         */
        getExportConfiguration(side: number, slot: number): boolean;

        /**
         * Configure the export bus pointing in the specified direction to export item stacks matching the specified descriptor.
         */
        setExportConfiguration(
            side: number,
            slot: number,
            database: string,
            entry: number
        ): boolean;

        /**
         * Make the export bus facing the specified direction perform a single export operation into the specified slot.
         */
        exportIntoSlot(side: number, slot: number): boolean;
    }

    /**
     * @noSelf
     */
    interface craftable {
        /**
         * Returns the item stack representation of the crafting result.
         */
        getItemStack(): itemStack;

        /**
         * Requests the item to be crafted, returning an object that allows tracking the crafting status.
         */
        request(
            amount: number,
            prioritizePower: boolean,
            cpuName: string
        ): craftingStatus;
    }

    /**
     * @noSelf
     */
    interface craftingStatus {
        /**
         * Get whether the crafting request has been canceled.
         */
        isCanceled(): boolean;

        /**
         * Get whether the crafting request is done.
         */
        isDone(): boolean;
    }

    interface itemStack {
        damage?: number;
        hasTag?: boolean;
        isCraftable?: boolean;
        label?: string;
        maxDamage?: number;
        maxSize?: number;
        name?: string;
        size?: number;
    }

    interface fluid {
        amount?: number;
        hasTag?: boolean;
        label?: string;
        name?: string;
    }

    interface cpu {
        busy?: boolean;
        coprocessors?: number;
        name?: string;
        storage?: number;
    }
}

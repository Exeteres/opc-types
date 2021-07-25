declare namespace OC {
    interface ComponentMap {
        redstone: Components.Redstone;
        drone: Components.Drone;
        abstract_bus: Components.AbstractBus;
        access_point: Components.AccessPoint;
        chunkloader: Components.Chunkloader;
        computer: Components.Computer;
        crafting: Components.Crafting;
        data: Components.Data;
        database: Components.Database;
        debug: Components.Debug;
        drive: Components.Drive;
        eeprom: Components.EEPROM;
        experience: Components.Experience;
        filesystem: Components.Filesystem;
        generator: Components.Generator;
        geolyzer: Components.Geolyzer;
        gpu: Components.GPU;
        hologram: Components.Hologram;
        internet: Components.Internet;
        inventory_controller: Components.InventoryController;
        modem: Components.Modem;
    }

    type ComponentType = keyof ComponentMap;
}

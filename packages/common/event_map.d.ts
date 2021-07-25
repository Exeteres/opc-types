declare namespace OC {
    interface EventMap {
        // Computer
        component_added: [address: string, componentType: ComponentType];
        component_removed: [address: string, componentType: ComponentType];
        component_available: [componentType: ComponentType];
        component_unavailable: [componentType: ComponentType];
        term_available: [];
        term_unavailable: [];

        // Screen
        screen_resized: [screenAddress: string, newWidth: number, newHeight: number];
        touch: [screenAddress: string, x: number, y: number, button: number, playerName: string];
        drag: [screenAddress: string, x: number, y: number, button: number, playerName: string];
        drop: [screenAddress: string, x: number, y: number, button: number, playerName: string];
        scroll: [screenAddress: string, x: number, y: number, direction: number, playerName: string];
        walk: [screenAddress: string, x: number, y: number, playerName?: string];

        // Keyboard
        key_down: [keyboardAddress: string, char: number, code: number, playerName: string];
        key_up: [keyboardAddress: string, char: number, code: number, playerName: string];
        clipboard: [keyboardAddress: string, value: string, playerName: string];

        // Redstone Cards and I/O Block
        redstone_changed: [address: string, side: number, oldValue: number, newValue: number, color?: number];

        // Motion Sensor Block
        motion: [address: string, relativeX: number, relativeY: number, relativeZ: number, entityName?: string];

        // Network Cards
        modem_message: [
            receiverAddress: string,
            senderAddress: string,
            port: number,
            distance: number,
            ...payload: any[]
        ];

        // Robots
        inventory_changed: [slot: number];

        // Abstract Bus Card
        bus_message: [protocolId: number, senderAddress: number, targetAddress: number, data: object, metadata: object];

        // Carriage
        carriage_moved: [success: boolean, reason?: string, x?: number, y?: number, z?: number];
    }

    type EventType = keyof EventMap;
}

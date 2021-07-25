declare namespace OC.Components {
    /**
     * The Debug Card, which is only available in creative mode, provides a set of fairly
     * dangerous functionality for use in setting things up to debug and test code.
     * Do not use the Debug Card without backups.
     * No, really. One time I accidentally converted a vertical slice of the world entirely to Sign objects with no writing on them
     * @see https://ocdoc.cil.li/component:debug
     * @noSelf
     */
    interface Debug {
        /**
         * Changes the component network's energy buffer by the specified delta.
         */
        changeBuffer(value: number): number;

        /**
         * Connect the debug card to the block at the specified coordinates.
         */
        connectToBlock(x: number, y: number, z: number): boolean;

        /**
         * Get the entity of a player.
         */
        getPlayer(name: string): Player;

        /**
         * Get a list of currently logged-in players.
         */
        getPlayers(): Player[];

        /**
         * Get the world object for the specified dimension ID, or the container's.
         */
        getWorld(id?: number): any;

        /**
         * Get a list of all world IDs, loaded and unloaded.
         */
        getWorlds(): any;

        /**
         * Get the container's X position in the world.
         */
        getX(): number;

        /**
         * Get the container's Y position in the world.
         */
        getY(): number;

        /**
         * Get the container's Z position in the world.
         */
        getZ(): number;

        /**
         * Get whether a mod or API is loaded.
         */
        isModLoaded(name: string): boolean;

        /**
         * Runs an arbitrary command using a fake player.
         */
        runCommand(command: string): number;

        /**
         * Test method for user-data and general value conversion.
         */
        test(): any;

        /**
         * Get the scoreboard object for the world
         */
        getScoreboard(): Scoreboard;

        /**
         * Sends data to the debug card with the specified address.
         */
        sendToDebugCard(address: string, ...data: any[]): void;

        /**
         * Sends text to the specified player's clipboard if possible.
         */
        sendToClipboard(player: string, text: string): void;

        /**
         * Returns contents at the location in world by id (defaults to host world).
         * This method behaves the same as the move check for the robot and drone.
         * The first return value is a boolean indicating whether a robot or drone would be able to enter the location
         * (true means it would be blocked and cannot move into that space).
         * The second return is a string value short name of the type of obstruction.
         * Possible values here include: `EntityLivingBase`, `EntityMinecart`, `air`, `liquid`, `replaceable`, `passable`, and `solid`.
         * The final value returned is a serialized or table representation of the entity or block scanned at the location.
         * The following code snippet can be used to debug what is possibly blocking
         * the robot from moving forward, if the robot is facing in the negative x direction.
         * @tupleReturn
         */
        scanContentsAt(x: number, y: number, z: number, worldId?: number): [boolean, string, any];
    }

    interface World {
        /**
         * Get the metadata of the block at the specified coordinates.
         */
        getMetadata(x: number, y: number, z: number): number;

        /**
         * Get the ID of the block at the specified coordinates.
         */
        getBlockId(x: number, y: number, z: number): number;

        /**
         * Gets the numeric id of the current dimension.
         */
        getDimensionId(): number;

        /**
         * Check whether the block at the specified coordinates is loaded.
         */
        isLoaded(x: number, y: number, z: number): number;

        /**
         * Gets the seed of the world.
         */
        getSeed(): number;

        /**
         * Remove some fluid from a tank at the specified location.
         */
        removeFluid(amount: number, x: number, y: number, z: number, side: number): boolean;

        /**
         * Insert some fluid into the tank at the specified location.
         */
        insertFluid(id: string, amount: number, x: number, y: number, z: number, side: number): boolean;

        /**
         * Gets the name of the current dimension.
         */
        getDimensionName(): string;

        /**
         * Get the current world time.
         */
        getTime(): number;

        /**
         * Set the current world time.
         */
        setTime(value: number): void;

        /**
         * Get the light value (emission) of the block at the specified coordinates.
         */
        getLightValue(x: number, y: number, z: number): number;

        /**
         * Returns whether it is currently raining.
         */
        isRaining(): boolean;

        /**
         * Sets whether it is currently raining.
         */
        setRaining(value: boolean): void;

        /**
         * Returns whether it is currently thundering.
         */
        isThundering(): boolean;

        /**
         * Sets whether it is currently thundering.
         */
        setThundering(value: boolean): void;

        /**
         * Set the block at the specified coordinates.
         */
        setBlock(x: number, y: number, z: number, id: number | string, meta: number): number;

        /**
         * Set all blocks in the area defined by the two corner points (x1, y1, z1) and (x2, y2, z2).
         */
        setBlocks(
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            id: number | string,
            meta: number
        ): number;

        /**
         * Reduce the size of an item stack in the inventory at the specified location.
         */
        removeItem(x: number, y: number, z: number, slot: number, count?: number): number;

        /**
         * Insert an item stack into the inventory at the specified location.
         * NBT tag is expected in JSON format.
         */
        insertItem(
            id: string,
            count: number,
            damage: number,
            nbt: string,
            x: number,
            y: number,
            z: number,
            side: number
        ): boolean;

        /**
         * Get the current spawn point coordinates.
         * @tupleReturn
         */
        getSpawnPoint(): [number, number, number];

        /**
         * Set the spawn point coordinates.
         */
        setSpawnPoint(x: number, y: number, z: number): void;

        /**
         * Get whether the block at the specified coordinates is directly under the sky.
         */
        canSeeSky(x: number, y: number, z: number): number;

        /**
         * Get the light opacity of the block at the specified coordinates.
         */
        getLightOpacity(x: number, y: number, z: number): number;

        /**
         * Check whether the block at the specified coordinates has a tile entity.
         */
        hasTileEntity(x: number, y: number, z: number): number;

        /**
         * Play a sound at the specified coordinates.
         */
        playSoundAt(x: number, y: number, z: number, sound: string, range: number): void;

        /**
         * Get the NBT of the block at the specified coordinates.
         */
        getTileNBT(x: number, y: number, z: number): any;

        /**
         * Set the NBT of the block at the specified coordinates.
         */
        setTileNBT(x: number, y: number, z: number, nbt: any): boolean;

        /**
         * Gets the block state for the block at the specified position, optionally getting additional display related data
         */
        getBlockState(x: number, y: number, z: number, actualState?: boolean): void;
    }

    interface Player {
        /**
         * Get the player's world object.
         */
        getWorld(): World;

        /**
         * Get the player's game type.
         */
        getGameType(): string;

        /**
         * Set the player's game type (survival, creative, adventure).
         */
        setGameType(gametype: string): void;

        /**
         * Get the player's health.
         */
        getHealth(): number;

        /**
         * Set the player's health.
         */
        setHealth(health: number): void;

        /**
         * Get the player's max health.
         */
        getMaxHealth(): number;

        /**
         * Get the player's position.
         * @tupleReturn
         */
        getPosition(): [number, number, number];

        /**
         * Set the player's position.
         */
        setPosition(x: number, y: number, z: number): void;

        /**
         * Get the player's total experience.
         */
        getExperienceTotal(): number;

        /**
         * Get the player's level.
         */
        getLevel(): number;

        /**
         * Add a level to the player's experience level
         */
        addExperienceLevel(level: number): void;

        /**
         * Remove a level from the player's experience level.
         */
        removeExperienceLevel(level: number): void;

        /**
         * Adds the item stack to the players inventory.
         */
        insertItem(id: string, amount: number, meta: number, nbt?: string): number;

        /**
         * Clear the players inventory.
         */
        clearInventory(): void;
    }

    interface Scoreboard {
        /**
         * Create a new objective for the scoreboard.
         */
        addObjective(objectiveName: string, objectiveCriteria: string): void;

        /**
         * Remove an objective from the scoreboard.
         */
        removeObjective(objectiveName: string): void;

        /**
         * Increases the score of a player for a certain objective.
         */
        increasePlayerScore(playerName: string, objectiveName: string, score: number): void;

        /**
         * Decrease the score of a player for a certain objective.
         */
        decreasePlayerScore(playerName: string, objectiveName: string, score: number): void;

        /**
         * Add a player to a team.
         */
        addPlayerToTeam(player: string, team: string): boolean;

        /**
         * Remove a player from a specific team.
         */
        removePlayerFromTeam(player: string, team: string): boolean;

        /**
         * Remove a player from their team.
         */
        removePlayerFromTeams(player: string): boolean;

        /**
         * Add a team to the scoreboard.
         */
        addTeam(team: string): void;

        /**
         * Remove a team from the scoreboard.
         */
        removeTeam(teamName: string): void;

        /**
         * Gets the score of a player for a certain objective.
         */
        getPlayerScore(playerName: string, objectiveName: string): number;

        /**
         * Sets the score of a player for a certain objective.
         */
        setPlayerScore(playerName: string, objectiveName: string, score: number): void;
    }
}

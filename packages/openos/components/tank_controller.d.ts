declare namespace OpenOS{
    interface TankController {
        /** 
         * Get the capacity of the tank on the specified side of the robot. Back refers to the robot's own selected tank.
         * @returns The size of the tank, or null followed by a description why this function failed (usually no tank).
         */
        getTankCapacity(side: number): number | [boolean, string]
        
        /**
         * Gets amount of fluid in tank on specified side.
         * @returns The amount of fluid in tank, or null followed by a description why this function failed (usually no tank).
         */
        getTankLevel(side:number): number | [boolean, string]
        
        /**
         * Get a description of the fluid in the the tank on the specified side of the robot.
         * Note: sides.back is deprecated, use getFluidInInternalTank() instead
         * @returns The description of the fluid in the specified tank.
         */
        getFluidInTank(side:number): FluidStack

        /**
         * Get a description of fluid in the specified or selected slot of robot inventory.
         * @returns The description of the fluid in the specified internal tank of the robot.
         */
        getFluidInInternalTank(slot: number):FluidStack

        /**
         * Transfers fluid from a tank in the selected inventory slot to the selected tank. 
         * If the amount of fluid that would be generated from the item is too large to fit into the tank (for example buckets will usually generate 1000) nothing will happen, that is no fluid is lost.
         * @returns true if the drain is successful, false otherwise
         */
        drain(amount: number | null): boolean
        
        /**
         * Transfers fluid from the selected tank to a tank in the selected inventory slot. 
         * If the specified amount is too low (for example for buckets the minimum amount will usually be 1000) nothing will happen, that is no fluid is lost.
         * @returns true if the fill is successful, false otherwise
         */
        fill(amount: number | null): boolean

        /**
         * Gets capacity of tank in specified or selected slot of the robot inventory.
         * @returns The size of the tank in slot of robot inventory
         */
        getTankCapacityInSlot(slot:number):number

        /**
         * Gets amount of fluid tank item in specified or selected slot of the robot inventory.
         * @returns Amount of fluid tank item in specified or selected slot of the robot inventory
         */
        getTankLevelInSlot(slot:number):number
        
        /**
         * Gets description of fluid in tank item in the specified or selected slot of the robot inventory.
         * @returns The description of the fluid in the internal tank item in the selected slot
         */
        getFluidInTankInSlot(slot:number):FluidStack
    }

    interface FluidStack {
        //TODO: Figure out what properties are in this thing
        temp: number;
    }
}
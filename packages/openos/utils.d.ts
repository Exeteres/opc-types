/** @vararg */
interface LuaVarArgs<T> extends Array<T> {}

declare type Concat<
    Left extends any[],
    Right extends any[]
> = import("typescript-tuple").Concat<Left, Right>;

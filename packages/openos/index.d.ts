/// <reference types="lua-types/5.2" />

import "./utils";
import "./components";
import "./component";
import "./computer";
import "./event";
import "./uuid";
import "./internet";
import "./keyboard";
import "./robot";
import "./note";
import "./serialization";
import "./shell";
import "./sides";
import "./term";
import "./colors";
import "./process";
import "./filesystem";
import "./thread";

declare global {
    const args: LuaVarArgs<string>;
}

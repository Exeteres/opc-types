# OpenComputers and TypeScript

<div align="center">
<img src="https://gamepedia.cursecdn.com/minecraft_ru_gamepedia/f/f4/Корпус_компьютера1_(OpenComputers).png" alt="TypeScriptToLua" width="256" />
<img src="https://raw.githubusercontent.com/TypeScriptToLua/TypeScriptToLua/master/logo-hq.png" alt="TypeScriptToLua" width="256" />
</div>

<details open>
<summary>Language</summary>
<br>
<a href="README.md">
<img alt="Build status" src="https://img.shields.io/badge/english-red.svg?style=for-the-badge" /></a>

<a href="README.ru.md">
<img alt="Build status" src="https://img.shields.io/badge/russian-red.svg?style=for-the-badge" /></a>
</details>

## Introduction

This repository contains type declarations for [OpenOS](https://ocdoc.cil.li/) and [GUI](https://github.com/IgorTimofeev/GUI) (and also some of it dependencies).

It is assumed that you will use [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) as a transpiler.

Some examples can be found in the `examples` folder. Also look at [VSCode extension](https://github.com/Exeteres/oc-ts-extension), which integrates TypeScript with OpenComputers.

## Installation

```shell
# Typings for OpenOS
yarn add @opct/openos # or npm install @opct/openos -S

# Typings for GUI
yarn add @opct/gui

# TSTL
yarn add typescript-to-lua
```

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "outDir": "dist",
        "module": "commonjs",
        "lib": ["esnext"],
        "strict": true,
        "moduleResolution": "node",
        "rootDir": "src",
        "types": ["lua-types/jit", "@opct/openos", "@opct/gui"]
    },
    "tstl": {
        "luaTarget": "JIT"
    }
}
```

## Setting up a comfortable working environment

- You can use Visual Studio Code or any other editor with TypeScript support.
- Instead of a real mod, you can use an emulator. Otherwise, it is necessary to set `filesystem.bufferChanges` to `false` in order to have external access to the disk.
- Create a link to the disk to keep the source code separate from it:

    ```shell
    # linux / macos
    ln -s /path/to/disk/home/app dist
    ```

    ```cmd
    # windows (cmd)
    mklink /j dist C:\path\to\disk\home
    ```

- Use `tstl --watch`

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

This repository contains TypeScript declarations for OpenComputers APIs, some of its mods and operating systems, including [OpenOS](https://ocdoc.cil.li/) and [MineOS](https://github.com/IgorTimofeev/MineOS).

It is assumed that you will use [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) as a transpiler.

Some examples can be found in the `examples` folder. Also look at [VSCode extension](https://github.com/Exeteres/oc-ts-extension), which integrates TypeScript with OpenComputers.

## Supported mods / operating systems

| Name                              | Type             | Package                                     |
| --------------------------------- | ---------------- | ------------------------------------------- |
| OpenComputers (common API)        | Mod              | [@opct/common](packages/common)             |
| Applied Energistics 2 integration | Mod              | [@opct/ae2](packages/ae2)                   |
| OpenLight                         | Mod              | [@opct/openlight](packages/openlight)       |
| OpenPrinter                       | Mod              | [@opct/openprinter](packages/openprinter)   |
| OpenSecurity                      | Mod              | [@opct/opensecurity](packages/opensecurity) |
| OpenOS                            | Operating system | [@opct/openos](packages/openos)             |
| MineOS                            | Operating system | [@opct/mineos](packages/mineos)             |

## Installation

```shell
# Typings for OpenOS
yarn add @opct/openos # or npm install @opct/openos -S

# Typings for MineOS
yarn add @opct/mineos

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
    "types": ["lua-types/jit", "@opct/openos", "@opct/mineos"]
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

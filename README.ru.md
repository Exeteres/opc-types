# Open Computers and TypeScript

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

## Вступление

В этом репозитории находятся тайпинги для [OpenOS](https://ocdoc.cil.li/) и [GUI](https://github.com/IgorTimofeev/GUI) (и некоторых его зависимостей).

В качестве транспилера предполагается использование [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua).

В папке `examples` можно найти немного примеров.

## Установка

```shell
# Тайпиги для OpenOS
yarn add @opct/openos # or npm install @opct/openos -S

# Тайпиги для GUI
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

## Настройка удобного рабочего окружения

- Вы можете использовать Visual Studio Code или любой другой редактор с поддержкой TypeScript.
- Вместо реального мода можно использовать эмулятор. Иначе необходимо установить `filesystem.bufferChanges` на `false`, чтобы иметь внешний доступ к диску.
- Создайте ссылку на диск, чтобы хранить исходный код отдельно от него:

    ```shell
    # linux / macos
    ln -s /path/to/disk/home/app dist
    ```

    ```cmd
    # windows (cmd)
    mklink /j dist C:\path\to\disk\home
    ```

- Используйте `tstl --watch`

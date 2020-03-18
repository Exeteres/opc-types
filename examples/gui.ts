import {
    // Components
    workspace,
    panel,
    menu,
    actionButtons,
    filesystemTree,
    codeView,

    // Constants
    IO_MODE_BOTH,
    IO_MODE_FILE,
    LUA_SYNTAX_PATTERNS,
    LUA_SYNTAX_COLOR_SCHEME
} from "GUI";

import { isDirectory } from "filesystem";

const app = workspace();

app.addChild(panel(1, 1, app.width, app.height, 0x2d2d2d));
app.addChild(panel(1, 1, 4, 1, 0xeeeeee));
const mainMenu = app.addChild(
    menu(5, 1, app.width - 4, 0xeeeeee, 0x666666, 0x3366cc, 0xffffff)
);

mainMenu.addItem("VERY (VERY!) Simple Text Viewer", 0x0);

mainMenu.addItem("File");
mainMenu.addItem("Edit");

const buttons = app.addChild(actionButtons(1, 1, false));
buttons.close.onTouch = () => {
    app.stop();
};

const tree = app.addChild(
    filesystemTree(
        1,
        2,
        20,
        app.height,
        0xcccccc,
        0x3c3c3c,
        0x3c3c3c,
        0x999999,
        0x3c3c3c,
        0xe1e1e1,
        0xbbbbbb,
        0xaaaaaa,
        0xbbbbbb,
        0x444444,
        IO_MODE_BOTH,
        IO_MODE_FILE
    )
);
tree.updateFileList();
tree.onItemSelected = () => {
    if (isDirectory(tree.selectedItem)) return;
    editor.lines = [];
    for (const [line] of io.lines(tree.selectedItem)) {
        editor.lines.push(line);
    }
};

const editor = app.addChild(
    codeView(
        22,
        2,
        72,
        22,
        1,
        2,
        10,
        [],
        {},
        LUA_SYNTAX_PATTERNS,
        LUA_SYNTAX_COLOR_SCHEME,
        true,
        []
    )
);

app.draw();
app.start();

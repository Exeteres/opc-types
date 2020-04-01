/**
 * This is a multifunctional user interface library,
 * especially designed and optimized for low-performance computers.
 * @see https://github.com/IgorTimofeev/MineOS/wiki/GUI-API
 */
declare namespace GUI {
    interface Object {
        /** Current screen rendering coordinate of object by x-axis */
        x: number;

        /** Current screen rendering coordinate of object by y-axis */
        y: number;

        /** Object width */
        width: number;

        /** Object height */
        height: number;

        /**
         * Whether the object is hidden.
         * If the object is hidden, then its rendering and analysis of system events are ignored
         * */
        hidden: boolean;

        /**
         * Whether the object is disabled.
         * If the object is disabled, then it can be rendered, but all system events are ignored
         */
        disabled: boolean;

        /**
         * Optional variable that allows screen events to pass througs objects withount being processed
         */
        passScreenEvents: boolean;

        /**
         * Main method that is called to render this object on the screen.
         * It can be defined by the user in any convenient way
         */
        draw(force?: boolean): void;

        /** A pointer to the parent container of the object */
        parent: GUI.Container;

        /** A pointer to the first created container in children hierarchy. */
        firstParent: GUI.Container;

        /** Local position on the x-axis in the parent container */
        localX: number;

        /** Local position on the y-axis in the parent container */
        localY: number;

        /** Get the index of this object in the parent container (iterative method) */
        indexOf(): number;

        /** Move the object "back" in the container children hierarchy */
        moveForward(): void;

        /** Move the object "forward" in the container children hierarchy */
        moveBackward(): void;

        /** Move the object to the end of the container children hierarchy */
        moveToFront(): void;

        /** Move the object to the beginning of the container children hierarchy */
        moveToBack(): void;

        /**
         * Remove this object from the parent container.
         * Roughly speaking, this is a convenient way of self-destruction
         */
        remove(): void;
    }

    interface Container extends GUI.Object {
        /** Array that contains all child objects of this container */
        children: GUI.Object[];

        /**
         * Add specified object to the container as a child. When you do this, the object's global coordinates will become local.
         * If the optional parameter atIndex is specified, then the element will be added to the corresponding position in container.children table
         */
        addChild<T extends GUI.Object>(child: T, atIndex?: number): T;

        /**
         * Remove all child elements of the container.
         * If the optional parameters of the element indices are specified, the deletion will be performed in the appropriate range
         */
        removeChildren(fromIndex?: number, toIndex?: number): void;
    }

    interface Workspace extends GUI.Container {
        /**
         * Run the event processing for this container and analyse events for all it's child objects.
         * The delay parameter is similar to `computer.pullSignal` one
         */
        start(delay?: number): void;

        /** Stop processing events for this container */
        stop(): void;

        /** Consume currently processing event and skip it's handling for rest unprocessed child objects */
        consumeEvent(): void;
    }

    interface Application extends Workspace {}

    interface Panel extends GUI.Object {}

    interface Text extends GUI.Object {}

    interface Label extends GUI.Object {
        setAlignment(ah: number, av: number): void;
    }

    type Validator = (this: void, text: string) => boolean;

    interface Input extends GUI.Object {
        /** A variable that contains current displayed text of an object */
        text: string;

        /**
         * Property that allows widget to remember text that user inputs
         * and to navigate through it's history via arrows buttons.
         */
        historyEnabled: boolean;

        /** Method for activation of text inputting */
        startInput(): void;

        /**
         * The function that is called after the text is entered in the input field.
         * If it returns true, the text in the text field will be changed to the entered text,
         * otherwise the entered data will be ignored
         */
        validator: GUI.Validator;

        /**
         * The function that is called after entering data in the input field:
         * it's a handy thing if you want to do something after entering text.
         * If the object has .validator function, and if the text does not pass the check through it,
         * then .onInputFinished will not be called
         */
        onInputFinished: Function;
    }

    interface Button extends GUI.Object {
        /** This property allows the user to understand whether the button is pressed or not */
        pressed: boolean;

        /**
         * This property is responsible for the mode at which the button behaves like a switch: when pressed,
         * it will change its state to the opposite.
         */
        switchMode: boolean;

        /** This property is responsible for button's color transition animation when it is clicked */
        animated: boolean;

        /** Duration of the animation of the button when the animation is enabled */
        animationDuration: number;

        /** If this method exists, it is called after clicking on the button */
        onTouch: Function;
    }

    interface ActionButtons extends GUI.Object {
        /** Pointer to an red button object */
        close: Button;

        /** Pointer to an yellow button object */
        minimize: Button;

        /** Pointer to an green button object */
        maximize: Button;
    }

    type FrameHandler = (animation: Animation) => void;

    interface Animation {
        /** A pointer to the widget which contains this animation */
        object: GUI.Object;

        /**
         * Current animation playback position.
         * It is always in `[0.0; 1.0]` range, where `0.0` is animation starting and `1.0` is animation ending
         */
        position: number;

        /** Start animation playback. */
        start(): void;

        /** Stop animation playback */
        stop(): void;

        /** Remove animation from it's widget */
        remove(): void;

        /**
         * An animation frame handler.
         * It is called every frame before drawing stuff to screen buffer.
         */
        frameHandler: FrameHandler;

        /**
         * This function is called after finishing animation playback.
         * Important: calling `stop()` will not call this function
         */
        onFinish: Function;
    }

    interface Image extends GUI.Object {}

    interface Slider extends GUI.Object {
        /** Current slider value variable */
        value: number;

        /** This property will visually round silder values */
        roundValues: boolean;

        /** This function will be called after slider value changing */
        onValueChanged: Function;
    }

    interface Switch extends GUI.Object {
        /** Current switch state variable */
        state: boolean;

        /** Change switch state to specified one */
        setState(state: boolean): void;

        /** This function will be called when switch state is changed */
        onStateChanged: Function;
    }

    interface SwitchAndLabel extends GUI.Container {
        /** Pointer to switch child object */
        switch: Switch;

        /** Pointer to label child object */
        label: Label;
    }

    interface ColorSelector extends GUI.Object {
        /** This function will be called after choosing color from palette */
        onColorSelected: Function;

        color: number;
    }

    interface Cell {
        alignment: number;
        direction: number;
        spacing: number;
        fitting: number;
        width: number;
        height: number;
    }

    interface Layout extends GUI.Container {
        /**
         * Column of grid cell to which new child objects will be added.
         * Default value is `1`
         */
        defaultColumn: number;

        /**
         *  Row of grid cell to which new child objects will be added.
         * Default value is `1`
         */
        defaultRow: number;

        /** Two-dismensional array with rows/columns indices */
        cells: Cell[][];

        /** Toggle grid borders rendering. */
        showGrid: boolean;

        /**
         * Assign the specified grid cell to the layout child object.
         * One cell can contain as many objects as you want
         */
        setPosition<T extends GUI.Object>(
            column: number,
            row: number,
            child: T
        ): T;

        /**
         * Set size of the layout grid.
         * All objects located outside the range of new size must be assigned to required cells again via `:setPosition(...)`
         */
        setGridSize(columnCount: number, rowCount: number): this;

        /**
         * Set width of the specified column. The value can be one of two types: `GUI.SIZE_POLICY_ABSOLUTE` or `GUI.SIZE_POLICY_RELATIVE`.
         * In the first case, the width exists as pixels, and does not change when layout size is changed.
         */
        setColumnWidth(column: number, sizePolicy: number, size: number): this;

        /**
         * Set height of the specified row.
         * The behavior of the function is similar to `setColumnWidth(...)`
         */
        setRowHeight(row: number, sizePolicy: number, size: number): this;

        /** Add an empty column to layout grid with specified size */
        addColumn(sizePolicy: number, size: number): this;

        /** Add an empty row to layout grid with specified size */
        addRow(sizePolicy: number, size: number): this;

        /** Remove specified column from layout grid */
        removeColumn(column: number): this;

        /** Remove specified row from layout grid */
        removeRow(column: number): this;

        /**
         * Set grid cell orientation (direction) of the child objects positioning.
         * You can use `GUI.DIRECTION_HORIZONTAL` or `GUI.DIRECTION_VERTICAL`
         */
        setDirection(column: number, row: number, direction: number): this;

        /**
         * Assign the method for aligning child objects to the grid cell borders.
         * Following values and any combination of them can be used:
         * * GUI.ALIGNMENT_HORIZONTAL_LEFT
         * * GUI.ALIGNMENT_HORIZONTAL_CENTER
         * * GUI.ALIGNMENT_HORIZONTAL_RIGHT
         * * GUI.ALIGNMENT_VERTICAL_TOP
         * * GUI.ALIGNMENT_VERTICAL_CENTER
         * * GUI.ALIGNMENT_VERTICAL_BOTTOM
         */
        setAlignment(
            column: number,
            row: number,
            horizontalAlignment: number,
            verticalAlignment: number
        ): this;

        /**
         * Assign the specified grid cell distance in pixels between child objects.
         * The default value is `1`
         */
        setSpacing(column: number, row: number, spacing: number): this;

        /**
         * Assign the specified grid cell indents (margins) in pixels,
         * depending on the current alignment of this cell.
         */
        setMargin(
            column: number,
            row: number,
            horizontalMargin: number,
            verticalMargin: number
        ): this;

        /**
         *  Get current margins in pixels of specified cell
         * @tupleReturn
         */
        getMargin(column: number, row: number): [number, number, number];

        /**
         * Assign the specified grid cell automatic resizing of child objects by horizonal, vertical or both directions.
         * By default new child sizes will be equal the cell size.
         * If optional parameters are specified, then it is possible to set an size reducing,
         * i.e. the size of objects will be equal to Cell size - Offset value
         */
        setFitting(
            column: number,
            row: number,
            horizontalFitting: boolean,
            verticalFitting: boolean,
            horizontalOffset?: number,
            verticalOffset?: number
        ): this;

        /**
         * Forcibly recalculate child objects position.
         * By default this function is being called automatically, but in some cases it can be helful
         */
        update(): this;
    }

    interface Item {
        onTouch: Function;
    }

    interface List extends GUI.Layout {
        /** Index of currently selected item */
        selectedItem: number;

        /**
         * Add new item to object.
         * You can specify `onTouch()` function to if desired
         */
        addItem(text: string): GUI.Item;

        /** Get item by it's index */
        getItem(index: number): GUI.Item;

        /**
         * Set list items alignment.
         * By default it's set to `GUI.ALIGNMENT_HORIZONTAL_LEFT` and `GUI.ALIGNMENT_VERTICAL_TOP`
         */
        setAlignment(
            horizontalAlignmen: number,
            verticalAlignment: number
        ): this;

        /**
         * Choose an items display option for List boundaries.
         * The default alignment is left and top
         */
        setDirection(direction: number): this;

        /** Set spacing between List items */
        setSpacing(spacing: number): this;

        /** Set margin in pixels depending on the current alignment of List */
        setMargin(horizontalMargin: number, verticalMargin: number): this;

        /**
         * Get current margins in pixels of List
         * @tupleReturn
         */
        getMargin(): [number, number, number];
    }

    interface Menu extends GUI.Layout {
        /**
         * Add a new item to Menu.
         * You can specify `onTouch()` function to item if desired
         */
        addItem(text: string, color?: number): GUI.Item;

        /**
         * Add a context menu to this menu.
         * The behavior of returned object is the same as `GUI.addContextMenu(...)`
         */
        addContextMenu(text: string, color?: number): Menu;
    }

    interface ComboBox extends GUI.Object {
        /** Index of selected element */
        selectedItem: number;

        /**
         * Add a new item to ComboBox.
         * If disabled parameter is specified, this item will not react to mouse clicking
         */
        addItem(
            text: string,
            disabled?: boolean,
            shortcut?: string,
            color?: number
        ): Item;

        /** Add a new visual separator */
        addSeparator(): void;

        /** Remove item by it's index */
        removeItem(index: number): void;

        /** Get item by it's index or name */
        getItem(index: string | number): Item;

        /** Remove all items */
        clear(): void;

        /** Get items count */
        count(): number;
    }

    type OnResize = (width: number, height: number) => void;

    interface Resizer extends GUI.Object {
        /**
         * This function is called while moving the mouse pointer with the left button pressed on the resizer.
         * Two parameters are the distance traveled by the mouse pointer
         */
        onResize: OnResize;

        /** This function is called after you stop moving the mouse pointer over the resizer */
        onResizeFinished: Function;
    }

    interface ProgressBar extends GUI.Object {
        /** Current progressbar value */
        value: number;
    }

    type OnItem = (path: string) => void;

    interface FilesystemTree extends GUI.Object {
        /** Current root directory */
        workPath: string;

        /** Current selected item path */
        selectedItem: string;

        /** Update tree file list */
        updateFileList(): void;

        /** Recursuvely expands specified path and shows it's content */
        expandPath(path: string): void;

        /**
         * Add a filter to the specified file extension.
         * After that, only files witch specified extension well be able to be selected
         */
        addExtensionFilter(extension: string): void;

        /** This function is called when some item was selected */
        onItemSelected: OnItem;

        /** This function is called when some directory was expanded */
        onItemExpanded: OnItem;
    }

    interface FilesystemChooser extends GUI.Object {
        /**
         * This function is called after choosing file or directory and pressing submit button in dialog window.
         * One single parameter is an absolute path to selected item
         */
        onSubmit: OnItem;

        /** This function is called after pressing cancel button in dialog window */
        onCancel: Function;

        /**
         * This is method for setting window mode.
         * First parameter is needed to tell window what to do: to open or to save items.
         * It can be `GUI.IO_MODE_OPEN, GUI.IO_MODE_SAVE` or `GUI.IO_MODE_BOTH`.
         * The second one is needed to setting showing mode.
         * It can be `GUI.IO_MODE_FILE`, `GUI.IO_MODE_DIRECTORY` or `GUI.IO_MODE_BOTH`
         */
        setMode(IOMode: number, showMode: number): void;

        /**
         * Add a filter to the specified file extension.
         * After that, only files witch specified extension well be able to be selected
         */
        addExtensionFilter(extension: string): void;
    }

    interface SelectionItem {
        line: number;
        symbol: number;
    }

    interface Selection {
        from: SelectionItem;
        to: SelectionItem;
    }

    interface CodeView extends GUI.Object {
        /** Array with strings displayed by widget */
        lines: string[];

        /** Line to display from */
        fromLine: number;

        /** Symbol to display from */
        fromSymbol: number;

        /** Array with selections */
        selections: GUI.Selection[];

        /** Table with highlights */
        highlights: any;

        /** Variable to set syntax highlighting */
        syntaxHighlight: boolean;
    }

    interface Window extends GUI.Container {
        resize(newWidth: number, newHeight: number): void;
        close(): void;
        minimize(): void;
        maximize(): void;
        onResize: (newWidth: number, newHeight: number) => void;
    }

    interface FilledWindow extends Window {
        backgroundPanel: GUI.Panel;
        actionButtons: GUI.ActionButtons;
    }

    interface TitleWindow extends FilledWindow {
        titleLabel: string;
        titlePanel: GUI.Panel;
    }

    interface TabbedWindow extends FilledWindow {
        tabBar: any;
    }

    interface Palette extends GUI.Window {
        color: any;
        submitButton: GUI.Button;
        cancelButton: GUI.Button;
    }
}

/**
 * @see https://github.com/IgorTimofeev/GUI
 * @noSelf
 * @noResolution
 */
declare module "GUI" {
    /** Align something to left side horizontally */
    export const ALIGNMENT_HORIZONTAL_LEFT: number;

    /** Align something to center side horizontally */
    export const ALIGNMENT_HORIZONTAL_CENTER: number;

    /** Align something to right side horizontally */
    export const ALIGNMENT_HORIZONTAL_RIGHT: number;

    /** Align something to top side vertically */
    export const ALIGNMENT_VERTICAL_TOP: number;

    /** Align something to center vertically */
    export const ALIGNMENT_VERTICAL_CENTER: number;

    /** Align something to bottom side vertically */
    export const ALIGNMENT_VERTICAL_BOTTOM: number;

    /** Horizontal direction of something */
    export const DIRECTION_HORIZONTAL: number;

    /** Vertical direction of something */
    export const DIRECTION_VERTICAL: number;

    /** Calculate sizes of something as absolute values */
    export const SIZE_POLICY_ABSOLUTE: number;

    /** Calculate sizes of something as relative (percentage) values */
    export const SIZE_POLICY_RELATIVE: number;

    /** Mode for working with files */
    export const IO_MODE_FILE: number;

    /** Mode for working with directories */
    export const IO_MODE_DIRECTORY: number;

    /** Mode for working with bothly files and directories */
    export const IO_MODE_BOTH: number;

    /** Mode for opening data */
    export const IO_MODE_OPEN: number;

    /** Mode for saving data */
    export const IO_MODE_SAVE: number;

    /** Button pressing duration with disabled animation */
    export const BUTTON_PRESS_DURATION = 0.2;

    /** Button pressing animation duration */
    export const BUTTON_ANIMATION_DURATION = 0.2;

    /** Switch state changing animation duration */
    export const SWITCH_ANIMATION_DURATION = 0.3;

    /** Filesystem dialog showing animation duration */
    export const FILESYSTEM_DIALOG_ANIMATION_DURATION = 0.5;

    /** Context menu separator color */
    export const CONTEXT_MENU_SEPARATOR_COLOR = 0x878787;

    /** Context menu default item text color */
    export const CONTEXT_MENU_DEFAULT_TEXT_COLOR = 0x2d2d2d;

    /** Context menu default item background color */
    export const CONTEXT_MENU_DEFAULT_BACKGROUND_COLOR = 0xffffff;

    /** Context menu default item background color */
    export const CONTEXT_MENU_PRESSED_BACKGROUND_COLOR = 0x3366cc;

    /** Context menu default item text color */
    export const CONTEXT_MENU_PRESSED_TEXT_COLOR = 0xffffff;

    /** Context menu disabled item text color */
    export const CONTEXT_MENU_DISABLED_COLOR = 0x878787;

    /** Context menu background transparency */
    export const CONTEXT_MENU_BACKGROUND_TRANSPARENCY = 0.24;

    /** Context menu shadow transparency */
    export const CONTEXT_MENU_SHADOW_TRANSPARENCY = 0.4;

    /** Background container panel color */
    export const BACKGROUND_CONTAINER_PANEL_COLOR = 0x0;

    /** Background container title color */
    export const BACKGROUND_CONTAINER_TITLE_COLOR = 0xe1e1e1;

    /** Background container panel transparency */
    export const BACKGROUND_CONTAINER_PANEL_TRANSPARENCY = 0.3;

    /** Window background panel color */
    export const WINDOW_BACKGROUND_PANEL_COLOR = 0xf0f0f0;

    /** Window shadow transparency */
    export const WINDOW_SHADOW_TRANSPARENCY = 0.6;

    /** Window title background color */
    export const WINDOW_TITLE_BACKGROUND_COLOR = 0xe1e1e1;

    /** Window title text color */
    export const WINDOW_TITLE_TEXT_COLOR = 0x2d2d2d;

    /** Window tab bar default background color */
    export const WINDOW_TAB_BAR_DEFAULT_BACKGROUND_COLOR = 0x2d2d2d;

    /** Window tab bar default text color */
    export const WINDOW_TAB_BAR_DEFAULT_TEXT_COLOR = 0xf0f0f0;

    /** Window tab bar selected background color */
    export const WINDOW_TAB_BAR_SELECTED_BACKGROUND_COLOR = 0xf0f0f0;

    /** Window tab bar selected text color */
    export const WINDOW_TAB_BAR_SELECTED_TEXT_COLOR = 0x2d2d2d;

    /** Path where `GUI.palette` favourites colors are being saved */
    export const PALETTE_CONFIG_PATH = "/lib/.palette.cfg";

    /** Required patterns for Lua syntax highlighting by `GUI.highlightString(...)` method */
    export const LUA_SYNTAX_PATTERNS: any;

    /** Default color scheme for Lua syntax highlighting by `GUI.highlightString(...)` method */
    export const LUA_SYNTAX_COLORS: any;

    export const LUA_SYNTAX_COLOR_SCHEME: any;

    export function object(
        x: number,
        y: number,
        width: number,
        height: number
    ): GUI.Object;

    export function container(
        x: number,
        y: number,
        width: number,
        height: number
    ): GUI.Container;

    export function workspace(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ): GUI.Workspace;

    export function application(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ): GUI.Application;

    export function panel(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        transparency?: number
    ): GUI.Panel;

    export function text(
        x: number,
        y: number,
        textColor: number,
        text: string
    ): GUI.Text;

    export function label(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        text: string
    ): GUI.Label;

    export function input(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        placeholderTextColor: number,
        backgroundFocusedColor: number,
        textFocusedColor: number,
        text: string,
        placeholderText?: string,
        eraseTextOnFocus?: boolean,
        textMask?: string
    ): GUI.Input;

    export function alert(text: string): void;

    export function button(
        x: number,
        y: number,
        width: number,
        height: number,
        buttonColor: number,
        textColor: number,
        buttonPressedColor: number,
        textPressedColor: number,
        text: string
    ): GUI.Button;

    export function actionButtons(
        x: number,
        y: number,
        fat?: boolean
    ): GUI.ActionButtons;

    export function image(x: number, y: number, image: Image): GUI.Image;

    export function slider(
        x: number,
        y: number,
        width: number,
        primaryColor: number,
        secondaryColor: number,
        pipeColor: number,
        valueColor: number,
        minimumValue: number,
        maximumValue: number,
        value: number,
        showCornerValues?: boolean,
        currentValuePrefix?: string,
        currentValuePostfix?: string
    ): GUI.Slider;

    function _switch(
        x: number,
        y: number,
        width: number,
        primaryColor: number,
        secondaryColor: number,
        pipeColor: number,
        state: boolean
    ): GUI.Switch;

    export { _switch as switch };

    export function switchAndLabel(
        x: number,
        y: number,
        width: number,
        switchWidth: number,
        primaryColor: number,
        secondaryColor: number,
        pipeColor: number,
        textColor: number,
        text: string,
        switchState: boolean
    ): GUI.SwitchAndLabel;

    export function colorSelector(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        text: string
    ): GUI.ColorSelector;

    export function list(
        x: number,
        y: number,
        width: number,
        height: number,
        itemSize: number,
        spacing: number,
        backgroundColor: number,
        textColor: number,
        alternateBackgroundColor: number,
        alternateTextColor: number,
        backgroundSelectedColor: number,
        textSelectedColor: number,
        offsetMode?: boolean
    ): GUI.List;

    export function layout(
        x: number,
        y: number,
        width: number,
        height: number,
        columnCount: number,
        rowCount: number
    ): GUI.Layout;

    export function menu(
        x: number,
        y: number,
        width: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        backgroundTransparency?: number
    ): GUI.Menu;

    export function comboBox(
        x: number,
        y: number,
        width: number,
        elementHeight: number,
        backgroundColor: number,
        textColor: number,
        arrowBackgroundColor: number,
        arrowTextColor: number
    ): GUI.ComboBox;

    export function resizer(
        x: number,
        y: number,
        width: number,
        height: number,
        resizerColor: number,
        arrowColor: number
    ): GUI.Resizer;

    export function progressBar(
        x: number,
        y: number,
        width: number,
        primaryColor: number,
        secondaryColor: number,
        valueColor: number,
        value: number,
        thin?: boolean,
        showValue?: boolean,
        valuePrefix?: string,
        valuePostfix?: string
    ): GUI.ProgressBar;

    export function filesystemTree(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number | null,
        directoryColor: number,
        fileColor: number,
        arrowColor: number,
        backgroundSelectionColor: number,
        textSelectionColor: number,
        arrowSelectionColor: number,
        disabledColor: number,
        scrollBarBackground: number,
        scrollBarForeground: number,
        showMode: number,
        selectionMode: number
    ): GUI.FilesystemTree;

    export function filesystemChooser(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        tipBackgroundColor: number,
        tipTextColor: number,
        initialText: string | null,
        sumbitButtonText: string,
        cancelButtonText: string,
        placeholderText: string,
        filesystemDialogPath: string
    ): GUI.FilesystemChooser;

    export function codeView(
        x: number,
        y: number,
        width: number,
        height: number,
        fromSymbol: number,
        fromLine: number,
        maximumLineLength: number,
        selections: GUI.Selection[],
        highlights: any,
        syntaxPatterns: any,
        syntaxColorScheme: any,
        syntaxHighlight: boolean,
        lines: string[]
    ): GUI.CodeView;

    export function window(
        x: number,
        y: number,
        width: number,
        height: number
    ): GUI.Window;

    export function filledWindow(
        x: number,
        y: number,
        width: number,
        height: number,
        fillColor: number
    ): GUI.FilledWindow;

    export function titledWindow(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        addTitlePanel?: boolean
    ): GUI.TitleWindow;

    export function tabbedWindow(
        x: number,
        y: number,
        width: number,
        height: number
    ): GUI.TabbedWindow;

    export function palette(
        x: number,
        y: number,
        width: number,
        initialColor: number
    ): GUI.Palette;
}

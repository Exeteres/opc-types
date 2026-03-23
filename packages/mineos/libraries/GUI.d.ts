/**
 * This is a multifunctional user interface library,
 * especially designed and optimized for low-performance computers.
 *
 * @see https://github.com/IgorTimofeev/MineOS/wiki/GUI-API
 * @noSelf
 * @noResolution
 */
declare module 'GUI' {
    /** Align something to the left side horizontally */
    export const ALIGNMENT_HORIZONTAL_LEFT = 1

    /** Align something to the center side horizontally */
    export const ALIGNMENT_HORIZONTAL_CENTER = 2

    /** Align something to the right side horizontally */
    export const ALIGNMENT_HORIZONTAL_RIGHT = 3

    /** Align something to the top side vertically */
    export const ALIGNMENT_VERTICAL_TOP = 4

    /** Align something to center vertically */
    export const ALIGNMENT_VERTICAL_CENTER = 5

    /** Align something to the bottom side vertically */
    export const ALIGNMENT_VERTICAL_BOTTOM = 6

    /** Horizontal direction of something */
    export const DIRECTION_HORIZONTAL = 7

    /** Vertical direction of something */
    export const DIRECTION_VERTICAL = 8

    /** Calculate sizes of something as absolute values */
    export const SIZE_POLICY_ABSOLUTE = 9

    /** Calculate sizes of something as relative (percentage) values */
    export const SIZE_POLICY_RELATIVE = 10

    /** Mode for working with files */
    export const IO_MODE_FILE = 11

    /** Mode for working with directories */
    export const IO_MODE_DIRECTORY = 12

    /** Mode for working with both files and directories */
    export const IO_MODE_BOTH = 13

    /** Mode for opening data */
    export const IO_MODE_OPEN = 14

    /** Mode for saving data */
    export const IO_MODE_SAVE = 15

    /** Button pressing duration with disabled animation */
    export const BUTTON_PRESS_DURATION = 0.2

    /** Button pressing animation duration */
    export const BUTTON_ANIMATION_DURATION = 0.2

    /** Switch state changing animation duration */
    export const SWITCH_ANIMATION_DURATION = 0.3

    /** Filesystem dialog showing animation duration */
    export const FILESYSTEM_DIALOG_ANIMATION_DURATION = 0.5

    /** Context menu default item background color */
    export const CONTEXT_MENU_DEFAULT_BACKGROUND_COLOR = 0x1e1e1e

    /** Context menu default item icon color */
    export const CONTEXT_MENU_DEFAULT_ICON_COLOR = 0x696969

    /** Context menu default item text color */
    export const CONTEXT_MENU_DEFAULT_TEXT_COLOR = 0xd2d2d2

    /** Context menu pressed item background color */
    export const CONTEXT_MENU_PRESSED_BACKGROUND_COLOR = 0x3366cc

    /** Context menu pressed item icon color */
    export const CONTEXT_MENU_PRESSED_ICON_COLOR = 0xb4b4b4

    /** Context menu pressed item text color */
    export const CONTEXT_MENU_PRESSED_TEXT_COLOR = 0xffffff

    /** Context menu disabled item icon color */
    export const CONTEXT_MENU_DISABLED_ICON_COLOR = 0x5a5a5a

    /** Context menu disabled item text color */
    export const CONTEXT_MENU_DISABLED_TEXT_COLOR = 0x5a5a5a

    /**
     * Context menu background transparency.
     * This is `nil` by default (no transparency).
     */
    export const CONTEXT_MENU_BACKGROUND_TRANSPARENCY: number | undefined

    /** Context menu shadow transparency */
    export const CONTEXT_MENU_SHADOW_TRANSPARENCY = 0.4

    /** Context menu separator color */
    export const CONTEXT_MENU_SEPARATOR_COLOR = 0x2d2d2d

    /** Background container panel color */
    export const BACKGROUND_CONTAINER_PANEL_COLOR = 0x0

    /** Background container title color */
    export const BACKGROUND_CONTAINER_TITLE_COLOR = 0xe1e1e1

    /** Background container panel transparency */
    export const BACKGROUND_CONTAINER_PANEL_TRANSPARENCY = 0.3

    /** Window background panel color */
    export const WINDOW_BACKGROUND_PANEL_COLOR = 0xf0f0f0

    /** Window shadow transparency */
    export const WINDOW_SHADOW_TRANSPARENCY = 0.6

    /** Window title background color */
    export const WINDOW_TITLE_BACKGROUND_COLOR = 0xe1e1e1

    /** Window title text color */
    export const WINDOW_TITLE_TEXT_COLOR = 0x2d2d2d

    /** Window tab bar default background color */
    export const WINDOW_TAB_BAR_DEFAULT_BACKGROUND_COLOR = 0x2d2d2d

    /** Window tab bar default text color */
    export const WINDOW_TAB_BAR_DEFAULT_TEXT_COLOR = 0xf0f0f0

    /** Window tab bar selected background color */
    export const WINDOW_TAB_BAR_SELECTED_BACKGROUND_COLOR = 0xf0f0f0

    /** Window tab bar selected text color */
    export const WINDOW_TAB_BAR_SELECTED_TEXT_COLOR = 0x2d2d2d

    /** Required patterns for Lua syntax highlighting by {@link highlightString} method */
    export const LUA_SYNTAX_PATTERNS: any

    /**
     * Color scheme interface for Lua syntax highlighting
     */
    export interface LuaSyntaxColorScheme {
        background: number
        text: number
        strings: number
        loops: number
        comments: number
        boolean: number
        logic: number
        numbers: number
        functions: number
        compares: number
        lineNumbersBackground: number
        lineNumbersText: number
        scrollBarBackground: number
        scrollBarForeground: number
        selection: number
        indentation: number
    }

    /** Lua syntax color scheme constant */
    export const LUA_SYNTAX_COLOR_SCHEME: LuaSyntaxColorScheme

    /**
     * Set object alignment fields.
     * @param object Target object
     * @param horizontalAlignment Horizontal alignment constant
     * @param verticalAlignment Vertical alignment constant
     * @returns The same object
     */
    export function setAlignment<
        T extends { horizontalAlignment: number; verticalAlignment: number }
    >(object: T, horizontalAlignment: number, verticalAlignment: number): T

    /**
     * Compute aligned coordinates of a rectangle inside a container.
     * @param x Container x coordinate
     * @param y Container y coordinate
     * @param width1 Container width
     * @param height1 Container height
     * @param horizontalAlignment Horizontal alignment constant
     * @param verticalAlignment Vertical alignment constant
     * @param width2 Inner width
     * @param height2 Inner height
     * @returns Aligned x and y coordinates
     */
    export function getAlignmentCoordinates(
        x: number,
        y: number,
        width1: number,
        height1: number,
        horizontalAlignment: number,
        verticalAlignment: number,
        width2: number,
        height2: number
    ): LuaMultiReturn<[number, number]>

    /**
     * Compute margin-adjusted coordinates.
     * @param x Base x coordinate
     * @param y Base y coordinate
     * @param horizontalAlignment Horizontal alignment constant
     * @param verticalAlignment Vertical alignment constant
     * @param horizontalMargin Horizontal margin
     * @param verticalMargin Vertical margin
     * @returns Adjusted x and y coordinates
     */
    export function getMarginCoordinates(
        x: number,
        y: number,
        horizontalAlignment: number,
        verticalAlignment: number,
        horizontalMargin: number,
        verticalMargin: number
    ): LuaMultiReturn<[number, number]>

    /**
     * Base GUI object interface
     */
    export interface Object {
        /** Current screen rendering coordinate of an object by x-axis */
        x: number

        /** Current screen rendering coordinate of an object by y-axis */
        y: number

        /** Object width */
        width: number

        /** Object height */
        height: number

        /**
         * Whether the object is hidden.
         * If the object is hidden, then its rendering and analysis of system events are ignored
         */
        hidden?: boolean

        /**
         * Whether the object is disabled.
         * If the object is disabled, then it can be rendered, but all system events are ignored
         */
        disabled?: boolean

        /**
         * When true, screen events are consumed by this object and do not propagate further.
         * When false, events pass through to objects below.
         */
        blockScreenEvents: boolean

        /** Whether this object should ignore a captured object while routing events */
        ignoresCapturedObject?: boolean

        /**
         * The main method that is called to render this object on the screen.
         * It can be defined by the user in any convenient way.
         * Returns the object itself for chaining.
         */
        draw(): Object

        /**
         * Check whether a point is inside this object's bounds.
         * @param x X coordinate
         * @param y Y coordinate
         */
        isPointInside(x: number, y: number): boolean

        /**
         * Optional event handler processed by the workspace event loop.
         * @param workspace Workspace that dispatches the event
         * @param object Event target
         * @param args Raw event arguments
         */
        eventHandler?: EventHandler

        /** A pointer to the workspace which the object belongs to */
        workspace?: Workspace

        /** A pointer to the parent container of the object */
        parent?: Container

        /** Local position on the x-axis in the parent container */
        localX?: number

        /** Local position on the y-axis in the parent container */
        localY?: number

        /**
         * Add animation to the object.
         * @param frameHandler Handler called on each animation frame
         * @param onFinish Handler called when animation finishes
         * @returns Animation object (supports chaining via `.start()`)
         */
        addAnimation(
            frameHandler: FrameHandler,
            onFinish?: FrameHandler
        ): Animation

        /**
         * Get the index of this object in the parent container.
         * @returns Index of the object
         */
        indexOf(): number

        /** Move the object one step toward the front in the parent container's children hierarchy */
        moveForward(): void

        /** Move the object one step toward the back in the parent container's children hierarchy */
        moveBackward(): void

        /** Move the object to the very front (last drawn) of the parent container's children hierarchy */
        moveToFront(): void

        /** Move the object to the very back (first drawn) of the parent container's children hierarchy */
        moveToBack(): void

        /**
         * Remove this object from the parent container.
         * Only valid after the object has been added to a container via `addChild`.
         */
        remove(): void
    }

    /**
     * Container interface - can hold child objects
     */
    export interface Container extends Object {
        /** Array that contains all child objects of this container */
        children: Object[]

        /**
         * Add a specified object to the container as a child. When you do this, the object's global coordinates will become local.
         * If the optional parameter atIndex is specified, then the element will be added to the corresponding position in 'container.children' table
         * @param child Child object to add
         * @param atIndex Optional index to insert at
         * @returns The added child object
         */
        addChild<T extends Object>(child: T, atIndex?: number): T

        /**
         * Remove all child elements of the container.
         * If the optional parameters of the element indices are specified, the deletion will be performed in the appropriate range
         * @param fromIndex Starting index
         * @param toIndex Ending index
         */
        removeChildren(fromIndex?: number, toIndex?: number): void
    }

    /**
     * Workspace interface - a top-level container that processes events
     */
    export interface Workspace extends Container {
        /**
         * Run the event processing for this container and analyze events for all its child objects.
         * The delay parameter is similar to `computer.pullSignal` one
         * @param delay Event pull timeout
         */
        start(delay?: number): void

        /** Stop processing events for this container */
        stop(): void

        /**
         * The object that has captured all screen events (e.g. a focused input or a dragged window).
         * While set, screen events are routed exclusively to this object.
         */
        capturedObject?: Object

        /**
         * The object that currently has keyboard focus (e.g. an active input field).
         */
        focusedObject?: Object

        /**
         * Timeout passed to `event.pull` when there are no active animations.
         * Matches the `delay` argument given to `start()`.
         */
        eventPullTimeout?: number

        /**
         * Active animation list managed by the workspace event loop.
         * Animations are added via `object:addAnimation(...)` and removed automatically when finished.
         */
        animations?: Animation[]
    }

    /**
     * Animation frame handler function type
     * @param animation The animation object
     */
    export type FrameHandler = (animation: Animation) => void

    /**
     * Workspace event handler function type
     * @param workspace Workspace that dispatches the event
     * @param object Event target
     * @param args Raw event arguments
     */
    export type EventHandler = (
        workspace: Workspace,
        object: Object,
        ...args: any[]
    ) => void

    /**
     * Animation interface
     */
    export interface Animation {
        /** A pointer to the widget which contains this animation */
        object: Object

        /**
         * Current animation playback position.
         * It is always in `[0.0; 1.0]` range, where `0.0` is animation starting and `1.0` is animation ending
         */
        position: number

        /**
         * Start animation playback.
         * Returns this animation for chaining (e.g. `object:addAnimation(...):start(0.5)`).
         * @param duration Animation duration in seconds
         */
        start(duration: number): this

        /** Stop animation playback */
        stop(): void

        /** Remove animation from its widget */
        remove(): void

        /**
         * An animation frame handler.
         * It is called every frame before drawing stuff to the screen buffer.
         */
        frameHandler: FrameHandler

        /**
         * This function is called after finishing animation playback.
         * Important: calling `stop()` will not call this function
         */
        onFinish?: FrameHandler
    }

    /**
     * Panel interface - colored rectangle
     */
    export interface Panel extends Object {
        colors: {
            background: number
            transparency?: number
        }
    }

    /**
     * Text interface - simple text display
     */
    export interface Text extends Object {
        text: string
        color: number
        transparency?: number
    }

    /**
     * Label interface - aligned text display
     */
    export interface Label extends Object {
        text: string
        colors: { text: number }
        horizontalAlignment: number
        verticalAlignment: number

        /**
         * Set text alignment.
         * Returns this label for chaining.
         * @param ah Horizontal alignment constant
         * @param av Vertical alignment constant
         */
        setAlignment(ah: number, av: number): this
    }

    /**
     * Image interface - displays an image
     */
    export interface Image extends Object {
        image: LuaTable
    }

    /**
     * Blurred panel interface - panel with blur effect
     */
    export interface BlurredPanel extends Object {
        radius: number
        color: number
        transparency: number
    }

    /**
     * Validator function type for input fields
     * @param text Text to validate
     * @returns True if valid, false otherwise
     */
    export type Validator = (this: void, text: string) => boolean

    /**
     * Input field interface
     */
    export interface Input extends Object {
        /** A variable that contains the current displayed text of an object */
        text: string

        /**
         * Property that allows the widget to remember text that the user inputs
         * and to navigate through its history via arrows buttons.
         */
        historyEnabled: boolean

        history: string[]
        historyLimit: number
        historyIndex: number

        /** Method for activation of text inputting */
        startInput(): void

        /**
         * The function that is called after the text is entered in the input field.
         * If it returns true, the text in the text field will be changed to the entered text,
         * otherwise the entered data will be ignored
         */
        validator?: Validator

        /**
         * The function that is called after entering data in the input field.
         * It's a handy thing if you want to do something after entering text.
         * If the object has a `.validator` function, and if the text does not pass the check through it,
         * then `.onInputFinished` will not be called.
         */
        onInputFinished?: EventHandler

        /** Optional callback invoked on every key-down event while the input is focused */
        onKeyDown?: EventHandler

        textCutFrom: number
        cursorPosition: number
        textOffset: number
        cursorBlinkDelay: number
    }

    /**
     * Button interface
     */
    export interface Button extends Object {
        /** This property allows the user to understand whether the button is pressed or not */
        pressed: boolean

        /**
         * This property is responsible for the mode at which the button behaves like a switch: when pressed,
         * it will change its state to the opposite.
         */
        switchMode: boolean

        /** This property is responsible for the button's color transition animation when it is clicked */
        animated: boolean

        /** Duration of the animation of the button when the animation is enabled */
        animationDuration: number

        /** If this method exists, it is called after clicking on the button */
        onTouch?: EventHandler

        /**
         * Press the button programmatically
         * @param workspace The workspace
         * @param object The object
         * @param args Additional arguments
         */
        press(workspace: Workspace, object: Object, ...args: any[]): void

        colors: {
            default: {
                background: number
                text: number
            }
            pressed: {
                background: number
                text: number
            }
            disabled: {
                background: number
                text: number
            }
            transparency?: number
        }
    }

    /**
     * Action buttons interface (close, minimize, maximize)
     */
    export interface ActionButtons extends Container {
        /** Pointer to a red close button object */
        close: Button

        /** Pointer to a yellow minimize button object */
        minimize: Button

        /** Pointer to a green maximize button object */
        maximize: Button
    }

    /**
     * Slider interface
     */
    export interface Slider extends Object {
        /** Current slider value */
        value: number

        /** Minimum allowed value */
        minimumValue: number

        /** Maximum allowed value */
        maximumValue: number

        /** This property will visually round slider values */
        roundValues: boolean

        /** This function will be called after slider value changing */
        onValueChanged?: EventHandler

        showMaximumAndMinimumValues: boolean
        currentValuePrefix?: string
        currentValuePostfix?: string
        scrollSensivity: number

        colors: {
            active: number
            passive: number
            pipe: number
            value: number
        }
    }

    /**
     * Switch interface
     */
    export interface Switch extends Object {
        /** Current switch state variable */
        state: boolean

        colors: {
            active: number
            passive: number
            pipe: number
        }

        pipePosition: number
        animated: boolean
        animationDuration: number

        /**
         * Change switch state to specified one.
         * Returns this switch for chaining.
         * @param state New state
         */
        setState(state: boolean): this

        /** This function will be called when the switch state is changed */
        onStateChanged?: Function
    }

    /**
     * Switch and label combined widget interface
     */
    export interface SwitchAndLabel extends Container {
        /** Pointer to the switch child object */
        switch: Switch

        /** Pointer to the label child object */
        label: Label
    }

    /**
     * Progress bar interface
     */
    export interface ProgressBar extends Object {
        /** Current progressbar value (0–100) */
        value: number

        colors: {
            active: number
            passive: number
            value: number
        }

        thin: boolean
        showValue: boolean
        valuePrefix?: string
        valuePostfix?: string
    }

    /**
     * Color selector interface
     */
    export interface ColorSelector extends Object {
        /** This function will be called after choosing color from palette */
        onColorSelected?: EventHandler

        color: number
        text: string
    }

    /**
     * Chart interface for data visualization
     */
    export interface Chart extends Object {
        values: [number, number][]
        xAxisPostfix: string
        yAxisPostfix: string
        xAxisValueInterval: number
        yAxisValueInterval: number
        fillChartArea: boolean
        showYAxisValues: boolean
        showXAxisValues: boolean
        roundValues: boolean

        colors: {
            axis: number
            chart: number
            axisValue: number
            helpers: number
        }
    }

    /**
     * Braille canvas interface for pixel-precise drawing
     */
    export interface BrailleCanvas extends Object {
        /**
         * Get pixel state at braille-pixel coordinates.
         * @param x X coordinate (braille pixels, 2× the cell width)
         * @param y Y coordinate (braille pixels, 4× the cell height)
         * @returns Tuple of [state (0|1), color, braille symbol]
         */
        get(x: number, y: number): LuaMultiReturn<[number, number, string]>

        /**
         * Set pixel state at braille-pixel coordinates.
         * Returns this canvas for chaining.
         * @param x X coordinate
         * @param y Y coordinate
         * @param state Pixel state (on/off)
         * @param color Pixel color
         */
        set(x: number, y: number, state: boolean, color?: number): this

        /**
         * Fill rectangular area with pixels.
         * @param x X coordinate
         * @param y Y coordinate
         * @param width Width in braille pixels
         * @param height Height in braille pixels
         * @param state Pixel state (on/off)
         * @param color Pixel color
         */
        fill(
            x: number,
            y: number,
            width: number,
            height: number,
            state: boolean,
            color?: number
        ): void

        /** Clear the canvas (set all pixels to off) */
        clear(): void
    }

    /**
     * Progress indicator interface (spinning animation)
     */
    export interface ProgressIndicator extends Object {
        active: boolean

        /**
         * Reset indicator to its initial state.
         * @param state Whether the indicator should be active
         */
        reset(state: boolean): void

        /** Roll to the next animation frame */
        roll(): void
    }

    /**
     * Layout cell interface.
     * Stores per-cell configuration used internally by the layout engine.
     */
    export interface Cell {
        horizontalAlignment: number
        verticalAlignment: number
        horizontalMargin: number
        verticalMargin: number
        direction: number
        spacing: number
        horizontalFitting?: boolean
        verticalFitting?: boolean
        horizontalFittingRemove: number
        verticalFittingRemove: number
        /** Calculated x position within the layout (set during update) */
        x: number
        /** Calculated y position within the layout (set during update) */
        y: number
        /** Total width of children in this cell (set during update) */
        childrenWidth: number
        /** Total height of children in this cell (set during update) */
        childrenHeight: number
    }

    /**
     * Layout interface - grid-based container
     */
    export interface Layout extends Container {
        /**
         * Column of a grid cell to which new child objects will be added.
         * @default 1
         */
        defaultColumn: number

        /**
         * Row of grid cell to which new child objects will be added.
         * @default 1
         */
        defaultRow: number

        /** Two-dimensional array of cells indexed as `cells[row][column]` */
        cells: Cell[][]

        /** Toggle grid borders rendering (debug aid) */
        showGrid: boolean

        /**
         * Assign the specified grid cell to the layout child object.
         * One cell can contain as many objects as you want.
         * @param column Column index
         * @param row Row index
         * @param child Child object
         * @returns The positioned child
         */
        setPosition<T extends Object>(column: number, row: number, child: T): T

        /**
         * Set the size of the layout grid.
         * All objects located outside the range of new size must be assigned to required cells again via `:setPosition(...)`
         * @param columnCount Number of columns
         * @param rowCount Number of rows
         * @returns This layout
         */
        setGridSize(columnCount: number, rowCount: number): this

        /**
         * Set the width of the specified column.
         * The value can be one of two types: `GUI.SIZE_POLICY_ABSOLUTE` or `GUI.SIZE_POLICY_RELATIVE`.
         * In the first case, the width exists as pixels and does not change when the layout size is changed.
         * @param column Column index
         * @param sizePolicy Size policy constant
         * @param size Size value
         * @returns This layout
         */
        setColumnWidth(column: number, sizePolicy: number, size: number): this

        /**
         * Set the height of the specified row.
         * The behavior of the function is similar to `setColumnWidth(...)`
         * @param row Row index
         * @param sizePolicy Size policy constant
         * @param size Size value
         * @returns This layout
         */
        setRowHeight(row: number, sizePolicy: number, size: number): this

        /**
         * Add an empty column to layout grid with specified size
         * @param sizePolicy Size policy constant
         * @param size Size value
         * @returns This layout
         */
        addColumn(sizePolicy: number, size: number): this

        /**
         * Add an empty row to layout grid with specified size
         * @param sizePolicy Size policy constant
         * @param size Size value
         * @returns This layout
         */
        addRow(sizePolicy: number, size: number): this

        /**
         * Remove specified column from layout grid
         * @param column Column index
         * @returns This layout
         */
        removeColumn(column: number): this

        /**
         * Remove specified row from layout grid
         * @param row Row index
         * @returns This layout
         */
        removeRow(row: number): this

        /**
         * Set grid cell orientation (direction) of the child objects positioning.
         * You can use `GUI.DIRECTION_HORIZONTAL` or `GUI.DIRECTION_VERTICAL`
         * @param column Column index
         * @param row Row index
         * @param direction Direction constant
         * @returns This layout
         */
        setDirection(column: number, row: number, direction: number): this

        /**
         * Assign the method for aligning child objects to the grid cell borders
         * @param column Column index
         * @param row Row index
         * @param horizontalAlignment Horizontal alignment constant
         * @param verticalAlignment Vertical alignment constant
         * @returns This layout
         */
        setAlignment(
            column: number,
            row: number,
            horizontalAlignment: number,
            verticalAlignment: number
        ): this

        /**
         * Assign the specified grid cell distance in pixels between child objects.
         * @param column Column index
         * @param row Row index
         * @param spacing Spacing value
         * @returns This layout
         */
        setSpacing(column: number, row: number, spacing: number): this

        /**
         * Assign the specified grid cell indents (margins) in pixels,
         * depending on the current alignment of this cell
         * @param column Column index
         * @param row Row index
         * @param horizontalMargin Horizontal margin
         * @param verticalMargin Vertical margin
         * @returns This layout
         */
        setMargin(
            column: number,
            row: number,
            horizontalMargin: number,
            verticalMargin: number
        ): this

        /**
         * Get current margins in pixels of specified cell
         * @param column Column index
         * @param row Row index
         * @returns Tuple of [horizontalMargin, verticalMargin]
         */
        getMargin(column: number, row: number): LuaMultiReturn<[number, number]>

        /**
         * Assign the specified grid cell automatic resizing of child objects by horizontal, vertical, or both directions
         * @param column Column index
         * @param row Row index
         * @param horizontalFitting Enable horizontal fitting
         * @param verticalFitting Enable vertical fitting
         * @param horizontalOffset Pixels to subtract from fitted width
         * @param verticalOffset Pixels to subtract from fitted height
         * @returns This layout
         */
        setFitting(
            column: number,
            row: number,
            horizontalFitting: boolean,
            verticalFitting: boolean,
            horizontalOffset?: number,
            verticalOffset?: number
        ): this

        /**
         * Forcibly recalculate child objects' positions.
         * By default, this function is called automatically on each draw, but can be useful to call manually.
         * @returns This layout
         */
        update(): this
    }

    /**
     * List item interface
     */
    export interface Item extends Button {
        onTouch?: EventHandler
    }

    /**
     * List interface
     */
    export interface List extends Layout {
        /** Index of the currently selected item */
        selectedItem: number

        /**
         * Add new item to the list
         * @param text Item text
         * @returns The added item
         */
        addItem(text: string): Item

        /**
         * Get an item by its index or text
         * @param index Item index or text
         * @returns The item, or undefined if not found
         */
        getItem(index: number | string): Item | undefined

        /**
         * Set list items alignment.
         * This is a convenience wrapper around `Layout.setAlignment` for cell (1, 1).
         * @param horizontalAlignment Horizontal alignment constant
         * @param verticalAlignment Vertical alignment constant
         * @returns This list
         */
        setAlignment(
            horizontalAlignment: number,
            verticalAlignment: number
        ): this

        /**
         * Choose items display direction for the List.
         * This is a convenience wrapper around `Layout.setDirection` for cell (1, 1).
         * @param direction Direction constant
         * @returns This list
         */
        setDirection(direction: number): this

        /**
         * Set spacing between List items.
         * This is a convenience wrapper around `Layout.setSpacing` for cell (1, 1).
         * @param spacing Spacing value
         * @returns This list
         */
        setSpacing(spacing: number): this

        /**
         * Set margin in pixels depending on the current alignment of the List.
         * This is a convenience wrapper around `Layout.setMargin` for cell (1, 1).
         * @param horizontalMargin Horizontal margin
         * @param verticalMargin Vertical margin
         * @returns This list
         */
        setMargin(horizontalMargin: number, verticalMargin: number): this

        /**
         * Get current margins in pixels of the List.
         * This is a convenience wrapper around `Layout.getMargin` for cell (1, 1).
         * @returns Tuple of [horizontalMargin, verticalMargin]
         */
        getMargin(): LuaMultiReturn<[number, number]>

        /** Whether items use offset (padding) mode instead of fixed size mode */
        offsetMode: boolean

        /**
         * Get count of items
         * @returns Number of items
         */
        count(): number
    }

    /**
     * Menu interface - horizontal menu bar
     */
    export interface Menu extends Container {
        /**
         * Add a new item to the Menu
         * @param text Item text
         * @param textColor Optional text color override
         * @returns The added item
         */
        addItem(text: string, textColor?: number): Item

        /**
         * Get item by index or text
         * @param index Item index or text
         * @returns The item, or undefined if not found
         */
        getItem(index: number | string): Item | undefined

        /**
         * Add a context (dropdown) sub-menu to this menu bar.
         * Returns the newly created DropDownMenu so items can be added to it.
         * @param text Menu item text
         * @param textColor Optional text color override
         * @returns The context (dropdown) menu attached to the item
         */
        addContextMenuItem(text: string, textColor?: number): DropDownMenu
    }

    /**
     * ComboBox interface - dropdown selection widget
     */
    export interface ComboBox extends Object {
        /** Index of the selected element */
        selectedItem: number

        /**
         * Add a new item to ComboBox.
         * Overload 1: text-only item.
         * @param text Item text
         * @param disabled Whether disabled
         * @param shortcut Shortcut text
         * @param color Text color
         * @returns The added item
         */
        addItem(
            text: string,
            disabled?: boolean,
            shortcut?: string,
            color?: number
        ): Item

        /**
         * Add a new item to ComboBox.
         * Overload 2: item with icon.
         * Note: TypeScript cannot distinguish these overloads at compile time because
         * both first arguments are strings; the icon variant is detected at runtime by
         * checking whether the second argument is also a string.
         * @param icon Item icon character
         * @param text Item text
         * @param disabled Whether disabled
         * @param shortcut Shortcut text
         * @param color Text color
         * @returns The added item
         */
        addItem(
            icon: string,
            text: string,
            disabled?: boolean,
            shortcut?: string,
            color?: number
        ): Item

        /** Add a new visual separator */
        addSeparator(): void

        /**
         * Remove an item by its index
         * @param index Item index
         */
        removeItem(index: number): void

        /**
         * Get an item by its index or name
         * @param index Item index or name
         * @returns The item, or undefined if not found
         */
        getItem(index: string | number): Item | undefined

        /** Remove all items */
        clear(): void

        /**
         * Get items count
         * @returns Number of items
         */
        count(): number

        /**
         * Callback when an item is selected
         * @param index Selected item index
         */
        onItemSelected?: (index: number) => void
    }

    /**
     * Dropdown menu interface
     */
    export interface DropDownMenu extends Container {
        itemHeight: number
        maximumHeight: number

        /**
         * Add a sub-menu item.
         * Overload 1: item with icon.
         * @param icon Item icon character
         * @param text Item text
         * @param disabled Whether disabled
         * @returns The sub-menu DropDownMenu
         */
        addSubMenuItem(
            icon: string,
            text: string,
            disabled?: boolean
        ): DropDownMenu

        /**
         * Add a sub-menu item.
         * Overload 2: text-only item.
         * @param text Item text
         * @param disabled Whether disabled
         * @returns The sub-menu DropDownMenu
         */
        addSubMenuItem(text: string, disabled?: boolean): DropDownMenu

        /**
         * Add item.
         * Overload 1: item with icon.
         * @param icon Item icon character
         * @param text Item text
         * @param disabled Whether disabled
         * @param shortcut Shortcut text
         * @param color Text color
         * @returns The added item
         */
        addItem(
            icon: string,
            text: string,
            disabled?: boolean,
            shortcut?: string,
            color?: number
        ): Item

        /**
         * Add item.
         * Overload 2: text-only item.
         * @param text Item text
         * @param disabled Whether disabled
         * @param shortcut Shortcut text
         * @param color Text color
         * @returns The added item
         */
        addItem(
            text: string,
            disabled?: boolean,
            shortcut?: string,
            color?: number
        ): Item

        /**
         * Add a separator line.
         * @returns The separator item
         */
        addSeparator(): Item

        /**
         * Remove item by index
         * @param index Item index
         * @returns This menu
         */
        removeItem(index: number): this

        /**
         * Release all items (un-press them all).
         * @returns This menu
         */
        releaseItems(): this
    }

    /**
     * Scroll bar interface
     */
    export interface ScrollBar extends Object {
        minimumValue: number
        maximumValue: number
        value: number
        onScrollValueIncrement: number
        shownValueCount: number
        thin: boolean
        onTouch?: EventHandler

        colors: {
            background: number
            foreground: number
        }
    }

    /**
     * Resize callback type
     * @param deltaX Horizontal distance the mouse moved since last event
     * @param deltaY Vertical distance the mouse moved since last event
     */
    export type OnResize = (deltaX: number, deltaY: number) => void

    /**
     * Resizer interface
     */
    export interface Resizer extends Object {
        /**
         * This function is called while moving the mouse pointer with the left button pressed on the resizer.
         * The two parameters are the distance traveled by the mouse pointer since the last event.
         */
        onResize?: OnResize

        /** This function is called after you stop moving the mouse pointer over the resizer */
        onResizeFinished?: Function
    }

    /**
     * Callback for item selection or expansion
     * @param item Item payload
     * @param args Optional event arguments
     */
    export type OnItem<T = string> = (item: T, ...args: any[]) => void

    /**
     * Tree item interface
     */
    export interface TreeItem {
        /** Display name */
        name: string
        /** Whether an item can be expanded */
        expandable: boolean
        /** Indentation offset */
        offset: number
        /** Item payload (used as the selectedItem value) */
        definition: any
        /** Whether an item is disabled */
        disabled?: boolean
    }

    /**
     * Tree interface
     */
    export interface Tree extends Object {
        colors: {
            default: {
                background: number
                expandable: number
                notExpandable: number
                arrow: number
            }
            selected: {
                background: number
                any: number
                arrow: number
            }
            scrollBar: {
                background: number
                foreground: number
            }
            disabled: number
        }
        items: TreeItem[]
        fromItem: number
        selectedItem: any
        expandedItems: LuaTable<string, boolean>
        scrollBar: ScrollBar
        showMode: number
        selectionMode: number

        /**
         * Add a tree item
         * @param name Display name
         * @param definition Item payload (stored as `selectedItem` when selected)
         * @param offset Indentation offset in characters
         * @param expandable Whether item is expandable
         * @param disabled Whether item is disabled
         * @returns Added item
         */
        addItem(
            name: string,
            definition: any,
            offset?: number,
            expandable?: boolean,
            disabled?: boolean
        ): TreeItem

        /** This function is called when some item was selected */
        onItemSelected?: OnItem<any>

        /** This function is called when some item was expanded/collapsed */
        onItemExpanded?: OnItem<TreeItem>
    }

    /**
     * Filesystem tree interface
     */
    export interface FilesystemTree extends Tree {
        /** Current root directory path */
        workPath: string

        /** Currently selected item path */
        selectedItem: string

        /**
         * Map of allowed file extensions (lowercased extension string → true).
         * When set, files not matching any extension are shown as disabled.
         */
        extensionFilters?: LuaTable<string, boolean>

        /** Rebuild the file list from `workPath` */
        updateFileList(): void

        /**
         * Recursively expand the tree to reveal the given path
         * @param path Path to expand to
         */
        expandPath(path: string): void

        /**
         * Add a filter to the specified file extension.
         * Only files with filtered extensions will be selectable.
         * @param extension File extension (e.g. ".lua")
         */
        addExtensionFilter(extension: string): void

        /** This function is called when some item was selected */
        onItemSelected?: OnItem<string>

        /** This function is called when some directory was expanded */
        onItemExpanded?: OnItem<TreeItem>
    }

    /**
     * Filesystem chooser interface
     */
    export interface FilesystemChooser extends Object {
        /** Currently selected path */
        path?: string

        /**
         * This function is called after choosing a file or directory and pressing the Submit button in the dialog window.
         * Receives the chosen path as a string.
         */
        onSubmit?: OnItem<string>

        /** This function is called after pressing the cancel button in the dialog window */
        onCancel?: Function

        /**
         * Set IO and filesystem mode
         * @param IOMode IO mode constant (e.g. `GUI.IO_MODE_OPEN`)
         * @param filesystemMode Filesystem mode constant (e.g. `GUI.IO_MODE_FILE`)
         */
        setMode(IOMode: number, filesystemMode: number): void

        /**
         * Add a filter to the specified file extension
         * @param extension File extension (e.g. ".lua")
         */
        addExtensionFilter(extension: string): void
    }

    /**
     * Filesystem dialog interface
     */
    export interface FilesystemDialog extends Container {
        submitButton: Button
        cancelButton: Button
        input: Input
        filesystemTree: FilesystemTree
        extensionComboBox: ComboBox

        /**
         * Set dialog IO and filesystem mode
         * @param IOMode IO mode constant
         * @param filesystemMode Filesystem mode constant
         */
        setMode(IOMode: number, filesystemMode: number): void

        /**
         * Add extension filter
         * @param extension File extension (e.g. ".lua")
         */
        addExtensionFilter(extension: string): void

        /**
         * Expand the filesystem tree to the given path
         * @param path Path to expand to
         */
        expandPath(path: string): void

        /**
         * Animate the dialog into view.
         * @returns This dialog
         */
        show(): this

        /** Called when the cancel button is pressed */
        onCancel?: Function

        /**
         * Called when the submit button is pressed.
         * @param path The selected path
         */
        onSubmit?: (path: string) => void
    }

    /**
     * Key and value display interface
     */
    export interface KeyAndValue extends Object {
        key: string
        value: string
    }

    /**
     * Auto-complete interface
     */
    export interface AutoComplete extends Object {
        maximumHeight: number
        fromItem: number
        selectedItem: number
        items: string[]
        matchText: string
        matchTextLength: number
        itemCount: number

        /**
         * Match variants against text and populate the item list.
         * @param variants Array of strings or a key-value object to search through
         * @param text Prefix text to match against
         * @param asKey When true, treats `variants` as an object and matches its keys
         * @returns This autocomplete
         */
        match(variants: string[] | object, text?: string, asKey?: boolean): this

        /** Clear all items */
        clear(): void

        /**
         * Callback when item is selected
         */
        onItemSelected?: EventHandler
    }

    /**
     * Selection cursor position interface
     */
    export interface SelectionItem {
        line: number
        symbol: number
    }

    /**
     * Text selection range interface
     */
    export interface Selection {
        from: SelectionItem
        to: SelectionItem
        /** Optional highlight color override */
        color?: number
    }

    /**
     * Code view interface
     */
    export interface CodeView extends Container {
        /** Array with strings displayed by the widget */
        lines: string[]

        /** Index of the first visible line */
        fromLine: number

        /** Index of the first visible symbol (column) */
        fromSymbol: number

        /** Maximum line length across all lines (used to size the horizontal scrollbar) */
        maximumLineLength: number

        /** Array with active text selections */
        selections: Selection[]

        /**
         * Map of line highlights: `highlights[lineNumber] = color`.
         * Lines with a highlight are drawn with a colored background.
         */
        highlights: { [line: number]: number }

        /** Whether syntax highlighting is active */
        syntaxHighlight: boolean

        /** Width of one indentation level in characters */
        indentationWidth: number

        verticalScrollBar: ScrollBar
        horizontalScrollBar: ScrollBar

        syntaxPatterns: any
        syntaxColorScheme: LuaSyntaxColorScheme | any
    }

    /**
     * Window interface
     */
    export interface Window extends Container {
        /**
         * Resize the window to the given dimensions.
         * @param newWidth New width
         * @param newHeight New height
         * @param ignoreOnResizeFinished When true, `onResizeFinished` is not called
         */
        resize(
            newWidth: number,
            newHeight: number,
            ignoreOnResizeFinished?: boolean
        ): void

        /** Toggle minimize (hidden) state of the window */
        minimize(): void

        /**
         * Toggle maximize state of the window.
         * @param animationDisabled Disable the maximize animation
         */
        maximize(animationDisabled?: boolean): void

        /**
         * Called on every resize step (including animation frames).
         * @param newWidth New width
         * @param newHeight New height
         */
        onResize?: (newWidth: number, newHeight: number) => void

        /** Called once when the resize interaction finishes */
        onResizeFinished?: Function

        /** Called when the window gains focus */
        onFocus?: Function

        /** Whether the window can be dragged by the user */
        movingEnabled: boolean

        /** Whether a drop shadow is drawn below the window */
        drawShadow: boolean

        /** Whether the window is currently maximized */
        maximized?: boolean

        /** Optional maximum width (honored by maximize) */
        maxWidth?: number

        /** Optional maximum height (honored by maximize) */
        maxHeight?: number

        /** Bring this window to front and set it as the focused object */
        focus(): void
    }

    /**
     * Filled window interface - window with a background panel and action buttons
     */
    export interface FilledWindow extends Window {
        backgroundPanel: Panel
        actionButtons: ActionButtons
    }

    /**
     * Titled window interface - filled window with a title label (and optional title panel)
     */
    export interface TitledWindow extends FilledWindow {
        titleLabel: Label
        /**
         * Only present when `addTitlePanel` was true in the `GUI.titledWindow(...)` call.
         */
        titlePanel?: Panel
    }

    /**
     * Tabbed window interface - filled window with a tab bar
     */
    export interface TabbedWindow extends FilledWindow {
        tabBar: List
    }

    /**
     * Text box interface
     */
    export interface TextBox extends Object {
        lines: (string | { text: string; color: number })[]
        currentLine: number

        /**
         * Scroll up by `count` lines
         * @param count Number of lines (default: 1)
         * @returns This textbox
         */
        scrollUp(count?: number): this

        /**
         * Scroll down by `count` lines
         * @param count Number of lines (default: 1)
         * @returns This textbox
         */
        scrollDown(count?: number): this

        /**
         * Scroll to the first line
         * @returns This textbox
         */
        scrollToStart(): this

        /**
         * Scroll to the last line
         * @returns This textbox
         */
        scrollToEnd(): this

        offset: { horizontal: number; vertical: number }
        autoWrap: boolean
        autoHeight: boolean
        scrollBar: ScrollBar
        scrollBarEnabled: boolean

        /** Recalculate wrapped lines and height */
        update(): void
    }

    /**
     * Palette (color picker) interface
     */
    export interface Palette extends Window {
        color: {
            integer: number
            rgb: { red: number; green: number; blue: number }
            hsb: { hue: number; saturation: number; brightness: number }
        }
        submitButton: Button
        cancelButton: Button

        /**
         * Show the palette as a blocking modal and return the selected color.
         * @returns Selected color as an integer
         */
        show(): number
    }

    /**
     * Table cell interface
     */
    export interface TableCell extends Object {
        selected: boolean
        alternative: boolean
        /** Optional per-cell color overrides (fall back to the parent Table colors when absent) */
        colors: {
            defaultBackground?: number
            defaultForeground?: number
            alternativeBackground?: number
            alternativeForeground?: number
            selectionBackground?: number
            selectionForeground?: number
        }
    }

    /**
     * Table text cell interface
     */
    export interface TableTextCell extends TableCell {
        text: string
    }

    /**
     * Table interface.
     * Internally implemented as a Layout, so all Layout methods are available
     * except addColumn and addRow, which have different signatures on Table.
     */
    export interface Table extends Omit<Layout, 'addColumn' | 'addRow'> {
        itemHeight: number
        selectedRows: { [row: number]: boolean }

        colors: {
            background: number
            headerBackground: number
            headerForeground: number
            itemDefaultBackground: number
            itemDefaultForeground: number
            itemAlternativeBackground: number
            itemAlternativeForeground: number
            itemSelectionBackground: number
            itemSelectionForeground: number
        }

        /**
         * Add a column with a header to the table
         * @param headerText Column header text
         * @param sizePolicy Size policy constant
         * @param size Size value
         */
        addColumn(headerText: string, sizePolicy: number, size: number): void

        /**
         * Add a row of cell objects to the table.
         * The number of objects must match the number of columns.
         * @param objects Cell objects (one per column)
         */
        addRow(...objects: Object[]): void

        /**
         * Set vertical scroll offset (in units of item height)
         * @param value Scroll value
         */
        setVerticalScroll(value: number): void

        /**
         * Get current vertical scroll offset
         * @returns Scroll value
         */
        getVerticalScroll(): number

        /** Clear all rows (headers are preserved) */
        clear(): void

        /** Called when any table cell is touched */
        onCellTouch?: EventHandler

        /** Called when the table background (outside any cell) is touched */
        onBackgroundTouch?: EventHandler
    }

    /**
     * Create a base GUI object
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @returns GUI object
     */
    export function object(
        x: number,
        y: number,
        width: number,
        height: number
    ): Object

    /**
     * Create a container
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @returns Container object
     */
    export function container(
        x: number,
        y: number,
        width: number,
        height: number
    ): Container

    /**
     * Create a workspace.
     * All parameters are optional and default to covering the full screen.
     * @param x X coordinate (default: 1)
     * @param y Y coordinate (default: 1)
     * @param width Width (default: screen width)
     * @param height Height (default: screen height)
     * @returns Workspace object
     */
    export function workspace(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ): Workspace

    /**
     * Create a panel (filled rectangle)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param color Background color
     * @param transparency Transparency (0.0–1.0)
     * @returns Panel object
     */
    export function panel(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        transparency?: number
    ): Panel

    /**
     * Create a text object
     * @param x X coordinate
     * @param y Y coordinate
     * @param textColor Text color
     * @param text Text content
     * @param transparency Transparency (0.0–1.0)
     * @returns Text object
     */
    export function text(
        x: number,
        y: number,
        textColor: number,
        text: string,
        transparency?: number
    ): Text

    /**
     * Create a label
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param color Text color
     * @param text Label text
     * @returns Label object
     */
    export function label(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        text: string
    ): Label

    /**
     * Create an input field
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param placeholderTextColor Placeholder text color
     * @param backgroundFocusedColor Focused background color
     * @param textFocusedColor Focused text color
     * @param text Initial text
     * @param placeholderText Placeholder text
     * @param eraseTextOnFocus Erase text when focused
     * @param textMask Character to display instead of actual text (e.g. "*" for passwords)
     * @returns Input object
     */
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
        text?: string,
        placeholderText?: string,
        eraseTextOnFocus?: boolean,
        textMask?: string
    ): Input

    /**
     * Show an alert dialog with the given values.
     * Tables are serialized automatically.
     * @param args Values to display
     */
    export function alert(...args: any[]): void

    /**
     * Draw a drop shadow beside a rectangle
     * @param x X coordinate of the rectangle
     * @param y Y coordinate of the rectangle
     * @param width Width of the rectangle
     * @param height Height of the rectangle
     * @param transparency Shadow transparency (0.0–1.0)
     * @param thin Use thin (1-pixel) shadow instead of 2-pixel
     */
    export function drawShadow(
        x: number,
        y: number,
        width: number,
        height: number,
        transparency: number,
        thin?: boolean
    ): void

    /**
     * Draw rounded corner characters around a rectangle
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param color Corner color
     * @param transparency Transparency (0.0–1.0)
     */
    export function drawRoundedCorners(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        transparency?: number
    ): void

    /**
     * Create a blurred panel
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param radius Blur radius (default: 3)
     * @param color Optional tint color
     * @param transparency Optional tint transparency
     * @returns BlurredPanel object
     */
    export function blurredPanel(
        x: number,
        y: number,
        width: number,
        height: number,
        radius?: number,
        color?: number,
        transparency?: number
    ): BlurredPanel

    /**
     * Create a button (fixed size)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function button(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create an adaptive button (auto-sized to text + padding)
     * @param x X coordinate
     * @param y Y coordinate
     * @param xOffset Horizontal padding on each side
     * @param yOffset Vertical padding on each side
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function adaptiveButton(
        x: number,
        y: number,
        xOffset: number,
        yOffset: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create a framed button (border only, no fill)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param frameColor Frame color
     * @param textColor Text color
     * @param framePressedColor Pressed frame color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function framedButton(
        x: number,
        y: number,
        width: number,
        height: number,
        frameColor: number,
        textColor: number,
        framePressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create an adaptive framed button
     * @param x X coordinate
     * @param y Y coordinate
     * @param xOffset Horizontal padding on each side
     * @param yOffset Vertical padding on each side
     * @param frameColor Frame color
     * @param textColor Text color
     * @param framePressedColor Pressed frame color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function adaptiveFramedButton(
        x: number,
        y: number,
        xOffset: number,
        yOffset: number,
        frameColor: number,
        textColor: number,
        framePressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create a rounded button
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function roundedButton(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create an adaptive rounded button
     * @param x X coordinate
     * @param y Y coordinate
     * @param xOffset Horizontal padding on each side
     * @param yOffset Vertical padding on each side
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function adaptiveRoundedButton(
        x: number,
        y: number,
        xOffset: number,
        yOffset: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create a tag button (with left-pointing arrow decoration)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function tagButton(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create an adaptive tag button
     * @param x X coordinate
     * @param y Y coordinate
     * @param xOffset Horizontal padding on each side
     * @param yOffset Vertical padding on each side
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed background color
     * @param textPressedColor Pressed text color
     * @param text Button text
     * @returns Button object
     */
    export function adaptiveTagButton(
        x: number,
        y: number,
        xOffset: number,
        yOffset: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        text: string
    ): Button

    /**
     * Create a textbox for displaying multiple lines of text
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color (or nil for transparent)
     * @param textColor Default text color
     * @param lines Array of text lines (strings or colored-text objects)
     * @param currentLine Starting line index (default: 1)
     * @param horizontalOffset Horizontal text offset in characters (default: 0)
     * @param verticalOffset Vertical text offset in lines (default: 0)
     * @param autoWrap Enable automatic text wrapping to fit width
     * @param autoHeight Automatically adjust height to fit content
     * @returns TextBox object
     */
    export function textBox(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number | undefined,
        textColor: number,
        lines: (string | { text: string; color: number })[],
        currentLine?: number,
        horizontalOffset?: number,
        verticalOffset?: number,
        autoWrap?: boolean,
        autoHeight?: boolean
    ): TextBox

    /**
     * Create action buttons (close, minimize, maximize)
     * @param x X coordinate
     * @param y Y coordinate
     * @param fatSymbol Use fat dot symbol
     * @returns ActionButtons container
     */
    export function actionButtons(
        x: number,
        y: number,
        fatSymbol?: boolean
    ): ActionButtons

    /**
     * Create an image widget
     * @param x X coordinate
     * @param y Y coordinate
     * @param image Image data table (from the Image library)
     * @returns Image object
     */
    export function image(x: number, y: number, image: LuaTable): Image

    /**
     * Create a slider
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param activeColor Active (filled) track color
     * @param passiveColor Passive (empty) track color
     * @param pipeColor Handle color
     * @param valueColor Value label color
     * @param minimumValue Minimum value
     * @param maximumValue Maximum value
     * @param value Initial value
     * @param showMaximumAndMinimumValues Show min/max labels beside the track
     * @param currentValuePrefix Prefix prepended to the current value label
     * @param currentValuePostfix Postfix appended to the current value label
     * @returns Slider object
     */
    export function slider(
        x: number,
        y: number,
        width: number,
        activeColor: number,
        passiveColor: number,
        pipeColor: number,
        valueColor: number,
        minimumValue: number,
        maximumValue: number,
        value: number,
        showMaximumAndMinimumValues?: boolean,
        currentValuePrefix?: string,
        currentValuePostfix?: string
    ): Slider

    /**
     * Create a switch (toggle).
     * Named `_switch` internally to avoid the reserved word; exported as `switch`.
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param activeColor Active (on) color
     * @param passiveColor Passive (off) color
     * @param pipeColor Handle color
     * @param state Initial state
     * @returns Switch object
     */
    function _switch(
        x: number,
        y: number,
        width: number,
        activeColor: number,
        passiveColor: number,
        pipeColor: number,
        state: boolean
    ): Switch

    export { _switch as switch }

    /**
     * Create a switch with a label
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Total width
     * @param switchWidth Width of the switch part
     * @param activeColor Switch active color
     * @param passiveColor Switch passive color
     * @param pipeColor Switch handle color
     * @param textColor Label text color
     * @param text Label text
     * @param switchState Initial switch state
     * @returns SwitchAndLabel object
     */
    export function switchAndLabel(
        x: number,
        y: number,
        width: number,
        switchWidth: number,
        activeColor: number,
        passiveColor: number,
        pipeColor: number,
        textColor: number,
        text: string,
        switchState: boolean
    ): SwitchAndLabel

    /**
     * Create a chart for data visualization
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param axisColor Axis line color
     * @param axisValueColor Axis label color
     * @param axisHelpersColor Grid helper line color
     * @param chartColor Chart line/area color
     * @param xAxisValueInterval X-axis label interval as a fraction of the value range (0.0–1.0)
     * @param yAxisValueInterval Y-axis label interval as a fraction of the value range (0.0–1.0)
     * @param xAxisPostfix String appended to X-axis labels
     * @param yAxisPostfix String appended to Y-axis labels
     * @param fillChartArea Fill the area under the chart line
     * @param values Initial data points as `[x, y]` pairs
     * @returns Chart object
     */
    export function chart(
        x: number,
        y: number,
        width: number,
        height: number,
        axisColor: number,
        axisValueColor: number,
        axisHelpersColor: number,
        chartColor: number,
        xAxisValueInterval?: number,
        yAxisValueInterval?: number,
        xAxisPostfix?: string,
        yAxisPostfix?: string,
        fillChartArea?: boolean,
        values?: [number, number][]
    ): Chart

    /**
     * Create a color selector button
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param color Initial color
     * @param text Button text
     * @returns ColorSelector object
     */
    export function colorSelector(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number,
        text: string
    ): ColorSelector

    /**
     * Create a list
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param itemSize Fixed size of each item (width in horizontal mode, height in vertical mode)
     * @param spacing Spacing between items
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param alternateBackgroundColor Alternating row background color
     * @param alternateTextColor Alternating row text color
     * @param backgroundSelectedColor Selected item background color
     * @param textSelectedColor Selected item text color
     * @param offsetMode Use offset (padding) mode instead of fixed-size mode
     * @returns List object
     */
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
    ): List

    /**
     * Create a layout (grid container)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param columnCount Number of columns
     * @param rowCount Number of rows
     * @returns Layout object
     */
    export function layout(
        x: number,
        y: number,
        width: number,
        height: number,
        columnCount: number,
        rowCount: number
    ): Layout

    /**
     * Create a horizontal menu bar
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundPressedColor Pressed item background color
     * @param textPressedColor Pressed item text color
     * @param backgroundTransparency Background transparency
     * @returns Menu object
     */
    export function menu(
        x: number,
        y: number,
        width: number,
        backgroundColor: number,
        textColor: number,
        backgroundPressedColor: number,
        textPressedColor: number,
        backgroundTransparency?: number
    ): Menu

    /**
     * Create a combobox
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param arrowBackgroundColor Arrow area background color
     * @param arrowTextColor Arrow color
     * @returns ComboBox object
     */
    export function comboBox(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        arrowBackgroundColor: number,
        arrowTextColor: number
    ): ComboBox

    /**
     * Create a resizer handle
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param helperColor Color of the resizer line
     * @param arrowColor Color of the directional arrow
     * @returns Resizer object
     */
    export function resizer(
        x: number,
        y: number,
        width: number,
        height: number,
        helperColor: number,
        arrowColor: number
    ): Resizer

    /**
     * Create a scrollbar
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Track background color
     * @param foregroundColor Handle color
     * @param minimumValue Minimum value
     * @param maximumValue Maximum value
     * @param value Current value
     * @param shownValueCount Number of visible items (used to size the handle)
     * @param onScrollValueIncrement Amount to change value on a scroll event
     * @param thin Use thin (character-based) rendering style
     * @returns ScrollBar object
     */
    export function scrollBar(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        foregroundColor: number,
        minimumValue: number,
        maximumValue: number,
        value: number,
        shownValueCount: number,
        onScrollValueIncrement: number,
        thin?: boolean
    ): ScrollBar

    /**
     * Create a progress bar
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param activeColor Active (filled) color
     * @param passiveColor Passive (empty) color
     * @param valueColor Value label color
     * @param value Initial value (0–100)
     * @param thin Use thin (character-based) rendering style
     * @param showValue Show the current value as text
     * @param valuePrefix String prepended to the value label
     * @param valuePostfix String appended to the value label
     * @returns ProgressBar object
     */
    export function progressBar(
        x: number,
        y: number,
        width: number,
        activeColor: number,
        passiveColor: number,
        valueColor: number,
        value: number,
        thin?: boolean,
        showValue?: boolean,
        valuePrefix?: string,
        valuePostfix?: string
    ): ProgressBar

    /**
     * Create a tree view
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param expandableColor Expandable item text color
     * @param notExpandableColor Non-expandable item text color
     * @param arrowColor Expand/collapse arrow color
     * @param backgroundSelectedColor Selected item background color
     * @param anySelectionColor Selected item text color
     * @param arrowSelectionColor Selected item arrow color
     * @param disabledColor Disabled item text color
     * @param scrollBarBackground Scrollbar background color
     * @param scrollBarForeground Scrollbar handle color
     * @param showMode Show mode constant (e.g. `GUI.IO_MODE_BOTH`)
     * @param selectionMode Selection mode constant (e.g. `GUI.IO_MODE_FILE`)
     * @returns Tree object
     */
    export function tree(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        expandableColor: number,
        notExpandableColor: number,
        arrowColor: number,
        backgroundSelectedColor: number,
        anySelectionColor: number,
        arrowSelectionColor: number,
        disabledColor: number,
        scrollBarBackground: number,
        scrollBarForeground: number,
        showMode: number,
        selectionMode: number
    ): Tree

    /**
     * Create a filesystem tree
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color (pass `null` for transparent)
     * @param directoryColor Directory item text color
     * @param fileColor File item text color
     * @param arrowColor Arrow color
     * @param backgroundSelectionColor Selected item background color
     * @param textSelectionColor Selected item text color
     * @param arrowSelectionColor Selected item arrow color
     * @param disabledColor Disabled item text color
     * @param scrollBarBackground Scrollbar background color
     * @param scrollBarForeground Scrollbar handle color
     * @param showMode Show mode constant
     * @param selectionMode Selection mode constant
     * @returns FilesystemTree object
     */
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
    ): FilesystemTree

    /**
     * Create a filesystem chooser (inline button that opens a dialog)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param tipBackgroundColor "…" button background color
     * @param tipTextColor "…" button text color
     * @param initialPath Initially selected path (or null)
     * @param submitButtonText Submit button label
     * @param cancelButtonText Cancel button label
     * @param placeholderText Placeholder text shown when no path is selected
     * @param filesystemDialogPath Root path for the file dialog
     * @returns FilesystemChooser object
     */
    export function filesystemChooser(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        textColor: number,
        tipBackgroundColor: number,
        tipTextColor: number,
        initialPath: string | null,
        submitButtonText: string,
        cancelButtonText: string,
        placeholderText: string,
        filesystemDialogPath: string
    ): FilesystemChooser

    /**
     * Create a code view widget
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param fromSymbol Index of the first visible symbol (column)
     * @param fromLine Index of the first visible line
     * @param maximumLineLength Maximum line length (for horizontal scrollbar sizing)
     * @param selections Initial selections array
     * @param highlights Initial highlights map
     * @param syntaxPatterns Syntax pattern array (use `GUI.LUA_SYNTAX_PATTERNS`)
     * @param syntaxColorScheme Color scheme object (use `GUI.LUA_SYNTAX_COLOR_SCHEME`)
     * @param syntaxHighlight Enable syntax highlighting
     * @param lines Initial lines array
     * @returns CodeView object
     */
    export function codeView(
        x: number,
        y: number,
        width: number,
        height: number,
        fromSymbol?: number,
        fromLine?: number,
        maximumLineLength?: number,
        selections?: Selection[],
        highlights?: { [line: number]: number },
        syntaxPatterns?: any,
        syntaxColorScheme?: LuaSyntaxColorScheme | any,
        syntaxHighlight?: boolean,
        lines?: string[]
    ): CodeView

    /**
     * Toggle window maximized state (standalone function form)
     * @param window Target window
     * @param animationDisabled Disable animation
     */
    export function windowMaximize(
        window: Window,
        animationDisabled?: boolean
    ): void

    /**
     * Toggle window minimized (hidden) state (standalone function form)
     * @param window Target window
     */
    export function windowMinimize(window: Window): void

    /**
     * Create a window
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @returns Window object
     */
    export function window(
        x: number,
        y: number,
        width: number,
        height: number
    ): Window

    /**
     * Create a filled window (window with background panel and action buttons)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background panel color
     * @param transparency Background panel transparency
     * @returns FilledWindow object
     */
    export function filledWindow(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number,
        transparency?: number
    ): FilledWindow

    /**
     * Create a titled window
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param title Window title text
     * @param addTitlePanel Add a colored title bar panel (titlePanel will be present when true)
     * @returns TitledWindow object
     */
    export function titledWindow(
        x: number,
        y: number,
        width: number,
        height: number,
        title: string,
        addTitlePanel?: boolean
    ): TitledWindow

    /**
     * Create a tabbed window
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @returns TabbedWindow object
     */
    export function tabbedWindow(
        x: number,
        y: number,
        width: number,
        height: number
    ): TabbedWindow

    /**
     * Create a dropdown menu
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param maximumHeight Maximum height before scrolling activates
     * @param itemHeight Height of each item (use 2 for normal, 1 for compact)
     * @param backgroundColor Background color
     * @param iconColor Default icon color
     * @param textColor Default text color
     * @param backgroundPressedColor Pressed item background color
     * @param iconPressedColor Pressed item icon color
     * @param textPressedColor Pressed item text color
     * @param disabledIconColor Disabled item icon color
     * @param disabledTextColor Disabled item text color
     * @param separatorColor Separator line color
     * @param backgroundTransparency Background transparency
     * @param shadowTransparency Shadow transparency
     * @returns DropDownMenu object
     */
    export function dropDownMenu(
        x: number,
        y: number,
        width: number,
        maximumHeight: number,
        itemHeight: number,
        backgroundColor: number,
        iconColor: number,
        textColor: number,
        backgroundPressedColor: number,
        iconPressedColor: number,
        textPressedColor: number,
        disabledIconColor: number,
        disabledTextColor: number,
        separatorColor: number,
        backgroundTransparency: number,
        shadowTransparency: number
    ): DropDownMenu

    /**
     * Add a context menu to a container.
     * Overload 1: create a new context menu at the given coordinates.
     * Additional color/transparency arguments are forwarded to the internal context menu constructor.
     * @param parent Parent container
     * @param x X coordinate
     * @param y Y coordinate
     * @param args Additional color/transparency arguments
     * @returns The new DropDownMenu
     */
    export function addContextMenu(
        parent: Container,
        x: number,
        y: number,
        ...args: any[]
    ): DropDownMenu

    /**
     * Add a context menu to a container.
     * Overload 2: attach an existing DropDownMenu.
     * @param parent Parent container
     * @param menu Existing menu to attach
     * @returns The attached DropDownMenu
     */
    export function addContextMenu(
        parent: Container,
        menu: DropDownMenu
    ): DropDownMenu

    /**
     * Create a filesystem dialog
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param submitButtonText Submit button label
     * @param cancelButtonText Cancel button label
     * @param placeholderText Placeholder text for the filename input
     * @param path Initial root path
     * @returns FilesystemDialog object
     */
    export function filesystemDialog(
        x: number,
        y: number,
        width: number,
        height: number,
        submitButtonText: string,
        cancelButtonText: string,
        placeholderText: string,
        path: string
    ): FilesystemDialog

    /**
     * Add a filesystem dialog to a container (with optional background overlay panel).
     * The dialog is centered and animated into view; call `.show()` on the result.
     * @param parent Parent container (typically the workspace)
     * @param addPanel Add a semi-transparent background panel behind the dialog
     * @param width Dialog width
     * @param height Dialog height
     * @param submitButtonText Submit button label
     * @param cancelButtonText Cancel button label
     * @param placeholderText Placeholder text for the filename input
     * @param path Initial root path
     * @returns FilesystemDialog object (call `.show()` to animate it in)
     */
    export function addFilesystemDialog(
        parent: Container,
        addPanel: boolean,
        width: number,
        height: number,
        submitButtonText: string,
        cancelButtonText: string,
        placeholderText: string,
        path: string
    ): FilesystemDialog

    /**
     * Add a background container (modal overlay helper).
     * When `addPanel` is true, touching the panel dismisses the container.
     * When `addLayout` is true, a centered Layout is added for easy content placement.
     * @param parent Parent container
     * @param addPanel Add a semi-transparent dismissible panel
     * @param addLayout Add a Layout child
     * @param title Optional title label (only used when `addLayout` is true)
     * @returns The background container
     */
    export function addBackgroundContainer(
        parent: Container,
        addPanel: boolean,
        addLayout: boolean,
        title?: string
    ): Container

    /**
     * Create a key and value display widget
     * @param x X coordinate
     * @param y Y coordinate
     * @param keyColor Key text color
     * @param valueColor Value text color
     * @param key Key text
     * @param value Value text
     * @returns KeyAndValue object
     */
    export function keyAndValue(
        x: number,
        y: number,
        keyColor: number,
        valueColor: number,
        key: string,
        value: string
    ): KeyAndValue

    /**
     * Draw a syntax-highlighted string directly to the screen buffer.
     * @param x X coordinate to draw at
     * @param y Y coordinate to draw at
     * @param fromChar First character index to draw (for horizontal scrolling)
     * @param indentationWidth Number of spaces per indentation level
     * @param patterns Syntax pattern array
     * @param colorScheme Color scheme object
     * @param s The string to highlight and draw
     */
    export function highlightString(
        x: number,
        y: number,
        fromChar: number,
        indentationWidth: number,
        patterns: any,
        colorScheme: LuaSyntaxColorScheme | any,
        s: string
    ): void

    /**
     * Create an autocomplete widget
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param maximumHeight Maximum number of visible items
     * @param backgroundColor Background color
     * @param textColor Default text color
     * @param textMatchColor Matched prefix text color
     * @param backgroundSelectedColor Selected item background color
     * @param textSelectedColor Selected item text color
     * @param textMatchSelectedColor Selected item matched prefix color
     * @param scrollBarBackground Scrollbar background color
     * @param scrollBarForeground Scrollbar handle color
     * @returns AutoComplete object
     */
    export function autoComplete(
        x: number,
        y: number,
        width: number,
        maximumHeight: number,
        backgroundColor: number,
        textColor: number,
        textMatchColor: number,
        backgroundSelectedColor: number,
        textSelectedColor: number,
        textMatchSelectedColor: number,
        scrollBarBackground: number,
        scrollBarForeground: number
    ): AutoComplete

    /**
     * Create a braille canvas
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width in terminal characters (each character = 2 braille pixels wide)
     * @param height Height in terminal characters (each character = 4 braille pixels tall)
     * @returns BrailleCanvas object
     */
    export function brailleCanvas(
        x: number,
        y: number,
        width: number,
        height: number
    ): BrailleCanvas

    /**
     * Create a progress indicator (spinning animation widget)
     * @param x X coordinate
     * @param y Y coordinate
     * @param passiveColor Color when inactive
     * @param primaryColor Primary color when active
     * @param secondaryColor Secondary (highlight) color when active
     * @returns ProgressIndicator object
     */
    export function progressIndicator(
        x: number,
        y: number,
        passiveColor: number,
        primaryColor: number,
        secondaryColor: number
    ): ProgressIndicator

    /**
     * Default table cell event handler (handles touch/drag for row selection).
     * Assign this to a custom cell's `eventHandler` to get default selection behavior.
     * @param workspace Workspace that dispatches the event
     * @param cell Table cell
     * @param args Raw event arguments
     */
    export function tableCellEventHandler(
        workspace: Workspace,
        cell: TableCell,
        ...args: any[]
    ): void

    /**
     * Default table cell draw handler.
     * Draws the cell background according to its selected/alternative state.
     * Returns the foreground color to use for cell content.
     * @param cell Table cell
     * @returns Foreground color
     */
    export function tableCellDraw(cell: TableCell): number

    /**
     * Default table event handler (handles scroll and background touch).
     * @param workspace Workspace that dispatches the event
     * @param table Table instance
     * @param args Raw event arguments
     */
    export function tableEventHandler(
        workspace: Workspace,
        table: Table,
        ...args: any[]
    ): void

    /**
     * Create a bare table cell with default draw and event handlers
     * @returns TableCell object
     */
    export function tableCell(): TableCell

    /**
     * Create a table text cell (cell that renders a text string)
     * @param text Cell text
     * @returns TableTextCell object
     */
    export function tableTextCell(text: string): TableTextCell

    /**
     * Create a table
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param itemHeight Height of each row in characters
     * @param background Table background color
     * @param headerBackground Header row background color
     * @param headerForeground Header row text color
     * @param itemDefaultBackground Default row background color
     * @param itemDefaultForeground Default row text color
     * @param itemAlternativeBackground Alternating row background color
     * @param itemAlternativeForeground Alternating row text color
     * @param itemSelectionBackground Selected row background color
     * @param itemSelectionForeground Selected row text color
     * @returns Table object
     */
    export function table(
        x: number,
        y: number,
        width: number,
        height: number,
        itemHeight: number,
        background: number,
        headerBackground: number,
        headerForeground: number,
        itemDefaultBackground: number,
        itemDefaultForeground: number,
        itemAlternativeBackground: number,
        itemAlternativeForeground: number,
        itemSelectionBackground: number,
        itemSelectionForeground: number
    ): Table

    /**
     * Create a tab bar (a List pre-configured for horizontal tabs)
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param itemSize Width of each tab
     * @param spacing Spacing between tabs
     * @param backgroundColor Background color
     * @param textColor Text color
     * @param backgroundAlternatingColor Alternating tab background color
     * @param textAlternatingColor Alternating tab text color
     * @param backgroundSelectedColor Selected tab background color
     * @param textSelectedColor Selected tab text color
     * @param offsetMode Use offset (padding) mode
     * @returns List object configured as a tab bar
     */
    export function tabBar(
        x: number,
        y: number,
        width: number,
        height: number,
        itemSize: number,
        spacing: number,
        backgroundColor: number,
        textColor: number,
        backgroundAlternatingColor: number,
        textAlternatingColor: number,
        backgroundSelectedColor: number,
        textSelectedColor: number,
        offsetMode?: boolean
    ): List

    /**
     * Create a color palette picker
     * @param x X coordinate
     * @param y Y coordinate
     * @param initialColor Initial color integer
     * @returns Palette object
     */
    export function palette(x: number, y: number, initialColor: number): Palette
}

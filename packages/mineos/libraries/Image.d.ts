/**
 * This library implements its own image format for OpenComputers with a simple lossless compression algorithm. It allows you to load and save pictures in .pic format, as well as to perform simple operations like string serialization/de-serialization/scaling/transforming.
 * 
 * @see https://github.com/IgorTimofeev/MineOS/wiki/Image-API
 * @noSelf
 * @noResolution
 */
declare module "Image" {
  /** OCIF image flat array: `[width, height, bg, fg, alpha, char, ...]` */
  type OCIFPicture = (number | string)[]

  /** Convolution kernel: `[size, ...normalizedWeights]` */
  type ConvolutionKernel = number[]

  /**
   * Computes the flat array index for pixel `(x, y)`.
   * @param x 1-based column
   * @param y 1-based row
   * @param width Image width
   * @returns Index of the background component for that pixel
   */
  function getIndex(x: number, y: number, width: number): number

  /**
   * Creates a new image filled with a single color/symbol, or random content.
   * @param width Width in cells
   * @param height Height in cells
   * @param background 24-bit background color
   * @param foreground 24-bit foreground color
   * @param alpha Transparency 0–1
   * @param symbol Unicode fill character
   * @param random Fill with random colors and characters if true
   * @returns New {@link OCIFPicture}
   */
  function create(
    width: number,
    height: number,
    background?: number,
    foreground?: number,
    alpha?: number,
    symbol?: string,
    random?: boolean
  ): OCIFPicture

  /**
   * Shallow-copies an image array.
   * @param picture Source image
   * @returns Copied {@link OCIFPicture}
   */
  function copy(picture: OCIFPicture): OCIFPicture

  /**
   * Saves an image to disk in OCIF format.
   * @param path Destination file path
   * @param picture Image to save
   * @param encodingMethod OCIF encoding method 5–8 (default `6`)
   * @returns `true`, or `false, reason` on failure
   */
  function save(
    path: string,
    picture: OCIFPicture,
    encodingMethod?: number
  ): LuaMultiReturn<[true] | [false, string]>

  /**
   * Reads OCIF header metadata from an open file handle without loading pixels.
   * @param file Readable binary file handle
   * @returns `signature, encodingMethod, width, height`, or `false, reason`
   */
  function readMetadata(
    file: object
  ): LuaMultiReturn<[string, number, number, number] | [false, string]>

  /**
   * Reads pixel data from an open file handle positioned after the header.
   * @param file Open binary file handle
   * @param encodingMethod Encoding method from {@link readMetadata}
   * @param width Image width from {@link readMetadata}
   * @param height Image height from {@link readMetadata}
   * @returns Loaded {@link OCIFPicture}, or `false, reason` on failure
   */
  function readPixelData(
    file: object,
    encodingMethod: number,
    width: number,
    height: number
  ): LuaMultiReturn<[OCIFPicture] | [false, string]>

  /**
   * Loads an OCIF image from disk.
   * @param path Source file path
   * @returns Loaded {@link OCIFPicture}, or `false, reason` on failure
   */
  function load(path: string): LuaMultiReturn<[OCIFPicture] | [false, string]>

  /**
   * Serializes an image to a compact hex string.
   * @param picture Source image
   * @returns Hex-encoded string
   */
  function toString(picture: OCIFPicture): string

  /**
   * Deserializes an image from a hex string produced by {@link toString}.
   * @param pictureString Hex-encoded image string
   * @returns Decoded {@link OCIFPicture}
   */
  function fromString(pictureString: string): OCIFPicture

  /**
   * Writes a single pixel into the image (mutates in place).
   * @param picture Target image
   * @param x 1-based column
   * @param y 1-based row
   * @param background 24-bit background color
   * @param foreground 24-bit foreground color
   * @param alpha Transparency 0–1
   * @param symbol Unicode character
   * @returns The same mutated `picture`
   */
  function set(
    picture: OCIFPicture,
    x: number,
    y: number,
    background: number,
    foreground: number,
    alpha: number,
    symbol: string
  ): OCIFPicture

  /**
   * Reads a single pixel from the image.
   * @param picture Source image
   * @param x 1-based column
   * @param y 1-based row
   * @returns `background, foreground, alpha, symbol`
   */
  function get(
    picture: OCIFPicture,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number, number, string]>

  /**
   * Returns both dimensions of an image.
   * @param picture Source image
   * @returns `width, height`
   */
  function getSize(picture: OCIFPicture): LuaMultiReturn<[number, number]>

  /**
   * Returns the image width in cells.
   * @param picture Source image
   */
  function getWidth(picture: OCIFPicture): number

  /**
   * Returns the image height in cells.
   * @param picture Source image
   */
  function getHeight(picture: OCIFPicture): number

  /**
   * Scales an image to new dimensions using nearest-neighbor sampling.
   * @param picture Source image
   * @param newWidth Target width
   * @param newHeight Target height
   * @returns New resized {@link OCIFPicture}
   */
  function transform(
    picture: OCIFPicture,
    newWidth: number,
    newHeight: number
  ): OCIFPicture

  /**
   * Extracts a rectangular region from an image.
   * @param picture Source image
   * @param fromX Start column (1-based)
   * @param fromY Start row (1-based)
   * @param width Region width
   * @param height Region height
   * @returns New cropped {@link OCIFPicture}, or `false, reason` if out of bounds
   */
  function crop(
    picture: OCIFPicture,
    fromX: number,
    fromY: number,
    width: number,
    height: number
  ): LuaMultiReturn<[OCIFPicture] | [false, string]>

  /**
   * Returns a horizontally mirrored copy of the image.
   * @param picture Source image
   * @returns New flipped {@link OCIFPicture}
   */
  function flipHorizontally(picture: OCIFPicture): OCIFPicture

  /**
   * Returns a vertically mirrored copy of the image.
   * @param picture Source image
   * @returns New flipped {@link OCIFPicture}
   */
  function flipVertically(picture: OCIFPicture): OCIFPicture

  /**
   * Returns a new image with empty-cell padding added on each side.
   * @param picture Source image
   * @param fromTop Rows to add at the top
   * @param fromBottom Rows to add at the bottom
   * @param fromLeft Columns to add on the left
   * @param fromRight Columns to add on the right
   * @param background Fill background color
   * @param foreground Fill foreground color
   * @param alpha Fill alpha
   * @param symbol Fill character
   * @returns New expanded {@link OCIFPicture}
   */
  function expand(
    picture: OCIFPicture,
    fromTop: number,
    fromBottom: number,
    fromLeft: number,
    fromRight: number,
    background: number,
    foreground: number,
    alpha: number,
    symbol: string
  ): OCIFPicture

  /**
   * Blends every pixel's colors toward a target color.
   * @param picture Source image
   * @param blendColor 24-bit target color
   * @param transparency Blend factor 0–1
   * @returns New blended {@link OCIFPicture}
   */
  function blend(
    picture: OCIFPicture,
    blendColor: number,
    transparency: number
  ): OCIFPicture

  /**
   * Returns a copy of the image rotated by a multiple of 90°.
   * @param picture Source image
   * @param angle Must be `90`, `180`, or `270`
   * @returns New rotated {@link OCIFPicture}
   */
  function rotate(picture: OCIFPicture, angle: 90 | 180 | 270): OCIFPicture

  /**
   * Adjusts hue, saturation and brightness of every pixel (mutates in place).
   * @param picture Target image
   * @param hue Hue delta in degrees
   * @param saturation Saturation delta −1 to 1
   * @param brightness Brightness delta −1 to 1
   * @returns The same mutated `picture`
   */
  function hueSaturationBrightness(
    picture: OCIFPicture,
    hue: number,
    saturation: number,
    brightness: number
  ): OCIFPicture

  /**
   * Shifts the hue of every pixel (mutates in place).
   * @param picture Target image
   * @param hue Delta in degrees
   * @returns The same mutated `picture`
   */
  function hue(picture: OCIFPicture, hue: number): OCIFPicture

  /**
   * Shifts the saturation of every pixel (mutates in place).
   * @param picture Target image
   * @param saturation Delta −1 to 1
   * @returns The same mutated `picture`
   */
  function saturation(picture: OCIFPicture, saturation: number): OCIFPicture

  /**
   * Shifts the brightness of every pixel (mutates in place).
   * @param picture Target image
   * @param brightness Delta −1 to 1
   * @returns The same mutated `picture`
   */
  function brightness(picture: OCIFPicture, brightness: number): OCIFPicture

  /**
   * Desaturates the image to black-and-white (mutates in place).
   * @param picture Target image
   * @returns The same mutated `picture`
   */
  function blackAndWhite(picture: OCIFPicture): OCIFPicture

  /**
   * Shifts RGB channels of every pixel by fixed offsets (mutates in place).
   * @param picture Target image
   * @param r Red offset −255 to 255
   * @param g Green offset −255 to 255
   * @param b Blue offset −255 to 255
   * @returns The same mutated `picture`
   */
  function colorBalance(
    picture: OCIFPicture,
    r: number,
    g: number,
    b: number
  ): OCIFPicture

  /**
   * Inverts all pixel colors (mutates in place).
   * @param picture Target image
   * @returns The same mutated `picture`
   */
  function invert(picture: OCIFPicture): OCIFPicture

  /**
   * Builds a Gaussian blur convolution kernel.
   * @param radius Kernel radius — side length is `radius * 2 + 1`
   * @param weight Gaussian standard deviation
   * @returns {@link ConvolutionKernel} for use with {@link convolve}
   */
  function getGaussianBlurKernel(radius: number, weight: number): ConvolutionKernel

  /**
   * Applies a convolution kernel to the image background channel.
   * @param picture Source image
   * @param kernel Kernel from {@link getGaussianBlurKernel}
   * @returns New convolved {@link OCIFPicture}
   */
  function convolve(picture: OCIFPicture, kernel: ConvolutionKernel): OCIFPicture
}

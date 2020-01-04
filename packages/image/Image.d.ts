/**
 * @see https://github.com/IgorTimofeev/Image
 * @noSelf
 * @noResolution
 */
declare module "image" {
    function getIndex(x: number, y: number, width: number): number;

    function load(path: string): Image;
}

type Image = number[][];

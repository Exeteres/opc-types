/**
 * Vector mathematics library for 2D-5D vector operations
 *
 * @noSelf
 * @noResolution
 */
declare module "Vector" {
    /** 2D vector type */
    type Vector2 = [number, number]
    /** 3D vector type */
    type Vector3 = [number, number, number]
    /** 4D vector type */
    type Vector4 = [number, number, number, number]
    /** 5D vector type */
    type Vector5 = [number, number, number, number, number]
    /** Generic vector type */
    type Vector = number[]

    /**
     * Creates a 2D vector
     * @param x X component
     * @param y Y component
     * @returns 2D vector
     */
    function newVector2(x: number, y: number): Vector2

    /**
     * Creates a 3D vector
     * @param x X component
     * @param y Y component
     * @param z Z component
     * @returns 3D vector
     */
    function newVector3(x: number, y: number, z: number): Vector3

    /**
     * Creates a 4D vector
     * @param x X component
     * @param y Y component
     * @param z Z component
     * @param w W component
     * @returns 4D vector
     */
    function newVector4(x: number, y: number, z: number, w: number): Vector4

    /**
     * Creates a 5D vector
     * @param x X component
     * @param y Y component
     * @param z Z component
     * @param u U component
     * @param v V component
     * @returns 5D vector
     */
    function newVector5(x: number, y: number, z: number, u: number, v: number): Vector5

    /**
     * Calculates scalar (dot) product of two vectors
     * @param vectorA First vector
     * @param vectorB Second vector
     * @returns Scalar product
     */
    function scalarMultiply(vectorA: Vector, vectorB: Vector): number

    /**
     * Calculates length (magnitude) of a vector
     * @param vector Input vector
     * @returns Vector length
     */
    function length(vector: Vector): number

    /**
     * Normalizes a vector to unit length (modifies in place)
     * @param vector Vector to normalize
     * @returns Normalized vector (same reference)
     */
    function normalize(vector: Vector3): Vector3

    /**
     * Calculates surface normal from three 3D points forming a triangle
     * @param vector1 First point
     * @param vector2 Second point
     * @param vector3 Third point
     * @returns Surface normal vector
     */
    function getSurfaceNormal(vector1: Vector3, vector2: Vector3, vector3: Vector3): Vector3

    /**
     * Converts vector to string representation
     * @param vector Input vector
     * @returns String in format "(x y z ...)"
     */
    function toString(vector: Vector): string
}
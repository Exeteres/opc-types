declare namespace OpenOS {
    /**
     * This component is provided by the Data Card.
     * @see https://ocdoc.cil.li/component:data
     * @noSelf
     */
    interface Data {
        /**
         * Computes CRC-32 hash of the data.
         * Result is in binary format.
         */
        crc32(data: string): string;

        /**
         * Applies base64 decoding to the data.
         */
        decode64(data: string): string;

        /**
         * Applies base64 encoding to the data.
         */
        encode64(data: string): string;

        /**
         * Computes MD5 hash of the data.
         * Result is in binary format.
         */
        md5(data: string): string;

        /**
         * Computes SHA2-256 hash of the data.
         * Result is in binary format.
         */
        sha256(data: string): string;

        /**
         * Applies deflate compression to the data.
         */
        deflate(data: string): string;

        /**
         * Applies inflate decompression to the data.
         */
        inflate(data: string): string;

        /**
         * The maximum size of data that can be passed to other functions of the card.
         */
        getLimit(): number;

        /**
         * Applies AES encryption to the data using the key and (preferably) random IV.
         */
        encrypt(data: string, key: string, iv: string): string;

        /**
         * Reverses AES encryption on the data using the key and the IV.
         */
        decrypt(data: string, key: string, iv: string): string;

        /**
         * Generates a random binary string of len length.
         */
        random(len: number): string;

        /**
         * Generates a public/private key pair for various cryptiographic functions.
         * Optional parameter specifies key length, 256 or 384 bits accepted.
         */
        generateKeyPair(bitLen?: number): [Key, Key];

        /**
         * Generates a signiture of data using a private key.
         * If signature is present verifies the signature using the public key and
         * the previously generated generated signature string. and the original string.
         */
        ecdsa(data: string, key: Key, sig: string): string | boolean;

        /**
         * Generates a Diffie-Hellman shared key using the first user's private key and
         * the second user's public key. An example of a basic key relation:
         * `ecdh(userA.private, userB.public) == ecdh(userB.private, userA.public)`
         */
        ecdh(privateKey: Key, publicKey: Key): string;

        /**
         * Transforms a key from string to it's arbitrary type.
         */
        deserializeKey(data: string, type: string): Key;
    }

    interface Key {
        serialize(): string;
        isPublic(): boolean;
    }
}

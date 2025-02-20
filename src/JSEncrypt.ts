import {b64tohex} from "../lib/jsbn/base64";
import { RSAKey } from "../lib/jsbn/rsa";


declare var JSENCRYPT_VERSION:string;

export interface IJSEncryptOptions {
    default_key_size?:string;
    default_public_exponent?:string;
    log?:boolean;
}

/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
export default class JSEncrypt {
    constructor(options:IJSEncryptOptions) {
        options = options || {};
        /* Unnecessary for rox
        this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
        this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
        this.log = options.log || false;
        */
        // The private and public key.
        this.key = null;
    }

    /* Unnecessary for rox
    private default_key_size:number;
    private default_public_exponent:string;
    private log:boolean;
    private key:JSEncryptRSAKey;
    */
   private key:RSAKey;

    public static version:string = JSENCRYPT_VERSION;

    /**
     * Method to set the rsa key parameter (one method is enough to set both the public
     * and the private key, since the private key contains the public key paramenters)
     * Log a warning if logs are enabled
     * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
     * @public
     */
    /* Unnecessary for rox
    public setKey(key:string) {
        if (this.log && this.key) {
            console.warn("A key was already set, overriding existing.");
        }
        this.key = new JSEncryptRSAKey(key);
    }
    */

    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */
    /* Unnecessary for rox
    public setPrivateKey(privkey:string) {
        // Create the key.
        this.setKey(privkey);
    }
    */

    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */
    /* Unnecessary for rox
    public setPublicKey(pubkey:string) {
        // Sets the public key.
        this.setKey(pubkey);
    }
    */

    /**
     * Proxy method for RSAKey object's decrypt, decrypt the string using the private
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str base64 encoded crypted string to decrypt
     * @return {string} the decrypted string
     * @public
     */
    /* Unnecessary for rox
    public decrypt(str:string) {
        // Return the decrypted string.
        try {
            return this.getKey().decrypt(b64tohex(str));
        } catch (ex) {
            return false;
        }
    }
    */

    /**
     * Proxy method for RSAKey object's encrypt, encrypt the string using the public
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str the string to encrypt
     * @return {string} the encrypted string encoded in base64
     * @public
     */
    /* Unnecessary for rox
    public encrypt(str:string) {
        // Return the encrypted string.
        try {
            return hex2b64(this.getKey().encrypt(str));
        } catch (ex) {
            return false;
        }
    }
    */

    /**
     * Proxy method for RSAKey object's sign.
     * @param {string} str the string to sign
     * @param {function} digestMethod hash method
     * @param {string} digestName the name of the hash algorithm
     * @return {string} the signature encoded in base64
     * @public
     */
    /* Unnecessary for rox
    public sign(str:string, digestMethod:(str:string) => string, digestName:string):string|false {
        // return the RSA signature of 'str' in 'hex' format.
        try {
            return hex2b64(this.getKey().sign(str, digestMethod, digestName));
        } catch (ex) {
            return false;
        }
    }
    */

    /**
     * Proxy method for RSAKey object's verify.
     * @param {string} str the string to verify
     * @param {string} signature the signature encoded in base64 to compare the string to
     * @param {function} digestMethod hash method
     * @return {boolean} whether the data and signature match
     * @public
     */
    public verify(str:string, signature:string, digestMethod:(str:string) => string):boolean {
        // Return the decrypted 'digest' of the signature.
        try {
            return this.getKey().verify(str, b64tohex(signature), digestMethod);
        } catch (ex) {
            return false;
        }
    }

    /**
     * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
     * will be created and returned
     * @param {callback} [cb] the callback to be called if we want the key to be generated
     * in an async fashion
     * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
     * @public
     */
    public getKey(cb?:() => void) {
        // Only create new if it does not exist.
        if (!this.key) {
            // Get a new private key.
            this.key = new RSAKey();
            /* Unnecessary for rox
            this.key = new JSEncryptRSAKey();
            if (cb && {}.toString.call(cb) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
                return;
            }
            // Generate the key.
            this.key.generate(this.default_key_size, this.default_public_exponent);
            */
        }
        return this.key;
    }

    /**
     * Returns the pem encoded representation of the private key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the private key WITH header and footer
     * @public
     */
    /* Unnecessary for rox
    public getPrivateKey() {
        // Return the private representation of this key.
        return this.getKey().getPrivateKey();
    }
    */

    /**
     * Returns the pem encoded representation of the private key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the private key WITHOUT header and footer
     * @public
     */
    /* Unnecessary for rox
    public getPrivateKeyB64() {
        // Return the private representation of this key.
        return this.getKey().getPrivateBaseKeyB64();
    }
    */


    /**
     * Returns the pem encoded representation of the public key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the public key WITH header and footer
     * @public
     */
    /* Unnecessary for rox
    public getPublicKey() {
        // Return the private representation of this key.
        return this.getKey().getPublicKey();
    }
    */

    /**
     * Returns the pem encoded representation of the public key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the public key WITHOUT header and footer
     * @public
     */
    /* Unnecessary for rox
    public getPublicKeyB64() {
        // Return the private representation of this key.
        return this.getKey().getPublicBaseKeyB64();
    }
    */
}


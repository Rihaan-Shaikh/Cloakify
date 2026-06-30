import { CryptoError } from './error';
import {
  base64ToUint8Array,
  uint8ArrayToBase64,
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from './utils';

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
}

export class CryptoService {
  /**
   * Generates a cryptographically strong random Uint8Array of the given length.
   */
  static generateRandomBytes(length: number): Uint8Array {
    try {
      const bytes = new Uint8Array(length);
      crypto.getRandomValues(bytes);
      return bytes;
    } catch (error) {
      throw new CryptoError('Failed to generate random bytes', error);
    }
  }

  /**
   * Derives an AES-GCM 256-bit key from a password and salt using PBKDF2.
   */
  static async deriveKey(
    password: string,
    salt: Uint8Array,
    iterations: number = 100000,
  ): Promise<CryptoKey> {
    try {
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveKey'],
      );

      return await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt as unknown as BufferSource,
          iterations: iterations,
          hash: 'SHA-256',
        },
        keyMaterial,
        {
          name: 'AES-GCM',
          length: 256,
        },
        false,
        ['encrypt', 'decrypt'],
      );
    } catch (error) {
      throw new CryptoError('Failed to derive key', error);
    }
  }

  /**
   * Encrypts plaintext using AES-256-GCM.
   */
  static async encrypt(plaintext: string, key: CryptoKey): Promise<EncryptedPayload> {
    try {
      const iv = this.generateRandomBytes(12);
      const encoded = new TextEncoder().encode(plaintext);

      const ciphertextBuffer = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv as unknown as BufferSource,
        },
        key,
        encoded,
      );

      return {
        ciphertext: arrayBufferToBase64(ciphertextBuffer),
        iv: uint8ArrayToBase64(iv),
      };
    } catch (error) {
      throw new CryptoError('Failed to encrypt data', error);
    }
  }

  /**
   * Decrypts ciphertext using AES-256-GCM.
   */
  static async decrypt(payload: EncryptedPayload, key: CryptoKey): Promise<string> {
    try {
      const iv = base64ToUint8Array(payload.iv);
      const ciphertext = base64ToArrayBuffer(payload.ciphertext);

      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv as unknown as BufferSource,
        },
        key,
        ciphertext,
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      throw new CryptoError('Failed to decrypt data', error);
    }
  }
}

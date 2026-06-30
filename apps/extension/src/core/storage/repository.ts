import { StorageKeys } from './keys';
import { StorageError } from './error';
import { StorageSchema } from './types';

export class StorageRepository {
  /**
   * Initializes storage with default version metadata if not present.
   */
  static async initialize(appVersion: string, storageVersion: number): Promise<void> {
    try {
      const currentStorageVer = await this.get(StorageKeys.STORAGE_VERSION);
      if (currentStorageVer === undefined) {
        await this.set(StorageKeys.STORAGE_VERSION, storageVersion);
        await this.set(StorageKeys.APP_VERSION, appVersion);
      }
    } catch (error) {
      throw new StorageError('Failed to initialize storage', error);
    }
  }

  /**
   * Get value from chrome.storage.local by key
   */
  static async get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | undefined> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key as string], (result) => {
        if (chrome.runtime.lastError) {
          return reject(
            new StorageError(`Failed to get key: ${String(key)}`, chrome.runtime.lastError),
          );
        }
        resolve(result[key as string] as StorageSchema[K] | undefined);
      });
    });
  }

  /**
   * Set value in chrome.storage.local by key
   */
  static async set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key as string]: value }, () => {
        if (chrome.runtime.lastError) {
          return reject(
            new StorageError(`Failed to set key: ${String(key)}`, chrome.runtime.lastError),
          );
        }
        resolve();
      });
    });
  }

  /**
   * Remove value from chrome.storage.local by key
   */
  static async remove<K extends keyof StorageSchema>(key: K): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove([key as string], () => {
        if (chrome.runtime.lastError) {
          return reject(
            new StorageError(`Failed to remove key: ${String(key)}`, chrome.runtime.lastError),
          );
        }
        resolve();
      });
    });
  }

  /**
   * Clear all chrome.storage.local data
   */
  static async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          return reject(new StorageError('Failed to clear storage', chrome.runtime.lastError));
        }
        resolve();
      });
    });
  }
}

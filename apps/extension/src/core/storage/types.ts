import { StorageKeys } from './keys';

export interface StorageSchema {
  [StorageKeys.APP_VERSION]: string;
  [StorageKeys.STORAGE_VERSION]: number;
  [StorageKeys.SETTINGS]: Record<string, unknown>;
  [key: string]: unknown;
}

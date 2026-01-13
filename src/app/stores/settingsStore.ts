import { LazyStore } from '@tauri-apps/plugin-store';
import { type LlmServiceName } from '../types/LlmService';
import { DEFAULT_SETTINGS } from '../consts/defaultSettings';

export interface AppSettings {
  llmService: LlmServiceName;
  model: string;
  apiKey: string;
  languagesAutoChange: boolean;
}

const store = new LazyStore('settings.json');

export async function setConfig<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
  await store.set(key, value);
  await store.save();
}

export async function getConfig<K extends keyof AppSettings>(key: K): Promise<AppSettings[K] | undefined> {
  const value = await store.get<AppSettings[K]>(key);
  return value ?? DEFAULT_SETTINGS[key];
}

export async function getAllConfigs() {
  const entries = await store.entries<any>();
  const allSettings = Object.fromEntries(entries);
  return { ...DEFAULT_SETTINGS, ...allSettings } as AppSettings;
}

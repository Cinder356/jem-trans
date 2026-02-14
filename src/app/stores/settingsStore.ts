import { LazyStore } from '@tauri-apps/plugin-store';
import { AppSettingsSchema, type AppSettings } from "../types/AppSettings";


const store = new LazyStore('settings.json');

export async function setConfig<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
  await store.set(key, value);
  await store.save();
}

export async function getAllConfigs(): Promise<AppSettings> {
  const entries = await store.entries<any>();
  const allSettings = Object.fromEntries(entries);

  return AppSettingsSchema.catch(AppSettingsSchema.parse({})).parse(allSettings);
}

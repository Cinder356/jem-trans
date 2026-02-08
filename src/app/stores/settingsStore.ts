import { LazyStore } from '@tauri-apps/plugin-store';
import { AppSettingsSchema, type AppSettings } from "../types/AppSettings";


const store = new LazyStore('settings.json');

export async function setConfig<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
  await store.set(key, value);
  await store.save();
}

// export async function getConfig<K extends keyof AppSettings>(key: K): Promise<AppSettings[K] | undefined> {
//   let value = await store.get<AppSettings[K]>(key);
//   const parsed = AppSettingsSchema.safeParse(value);
//   return parsed.data[key];
// }

export async function getAllConfigs(): Promise<AppSettings> {
  const entries = await store.entries<any>();
  const allSettings = Object.fromEntries(entries);

  // 1. We parse the settings. 
  // 2. We use .catch() to provide a fallback if 'allSettings' is invalid.
  // 3. The fallback is AppSettingsSchema.parse({}), which returns all defaults.

  return AppSettingsSchema.catch(AppSettingsSchema.parse({})).parse(allSettings);
}

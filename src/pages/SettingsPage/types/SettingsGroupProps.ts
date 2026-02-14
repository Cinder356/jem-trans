import type { AppSettings } from "@/app/types/AppSettings";
import type { ChangePropertyFn } from "@/app/contexts/SettingsContext";

export interface SettingsGroupProps {
  settings: AppSettings;
  changeSettingsProperty: ChangePropertyFn;
}

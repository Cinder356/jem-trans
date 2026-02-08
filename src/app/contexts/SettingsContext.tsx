import { useState, useCallback, useRef, useEffect, createContext, type PropsWithChildren, useMemo } from "react";
import { setConfig, getAllConfigs } from "@/app/stores/settingsStore";
import { type AppSettings } from "../types/AppSettings";

// export type GetPropertyFn = <K extends keyof AppSettings>(key: K) => AppSettings[K];
export type ChangePropertyFn = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;

interface SettingsContextValue {
  settings: AppSettings;
  changeSettingsProperty: ChangePropertyFn;
  setProperties: (value: AppSettings) => void;
  saveSettings: () => void;
  isSaved: boolean;
  restoreSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [savedSettings, setSavedSettings] = useState<AppSettings | null>(null);
  const settingsRef = useRef<AppSettings | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    getAllConfigs()
      .then((value) => {
        settingsRef.current = value;
        setSavedSettings(value);
      });
  }, []);

  const changeSettingsProperty: ChangePropertyFn = useCallback((key, value) => {
    setIsSaved(false);
    settingsRef.current = { ...settingsRef.current!, [key]: value };
  }, []);

  const setProperties = useCallback((value: AppSettings) => {
    setIsSaved(false);
    settingsRef.current = value;
  }, []);

  const saveSettings = useCallback(() => {
    (async () => {
      const entries = Object.entries(settingsRef.current!) as [keyof AppSettings, AppSettings[keyof AppSettings]][];
      const promises = entries.map(([key, value]) => setConfig(key, value));
      await Promise.all(promises);
    })();
    setIsSaved(true);
    setSavedSettings(settingsRef.current);
  }, []);

  const restoreSettings = useCallback(() => {
    settingsRef.current = savedSettings;
    setIsSaved(true);
  }, [savedSettings]);

  const contextValue = useMemo(() => ({
    settings: savedSettings!,
    changeSettingsProperty,
    setProperties,
    saveSettings,
    isSaved,
    restoreSettings
  }), [savedSettings, isSaved, changeSettingsProperty, setProperties, saveSettings, restoreSettings])

  if (!savedSettings) return null;

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

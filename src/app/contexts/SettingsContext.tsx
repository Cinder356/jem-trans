import { useState, useRef, useEffect, createContext, type PropsWithChildren } from "react";
import { setConfig, getAllConfigs, type AppSettings } from "@/app/stores/settingsStore";

type GetPropertyFn = <K extends keyof AppSettings>(key: K) => AppSettings[K];
type ChangePropertyFn = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;

interface SettingsContextValue {
  getProperty: GetPropertyFn;
  changeProperty: ChangePropertyFn;
  setProperties: (value: AppSettings) => void;
  saveSettings: () => void;
  isSaved: boolean;
  restoreSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const savedSettingRef = useRef<AppSettings | null>(null);
  const settingsRef = useRef<AppSettings | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllConfigs()
      .then((value) => {
        settingsRef.current = value;
        savedSettingRef.current = value;
        setIsLoaded(true);
      });
  }, []);

  const getProperty: GetPropertyFn = (key) => {
    if (!savedSettingRef.current)
      throw new Error('savedSettingsRef.current is null. Settings were not loaded.');
    return savedSettingRef.current[key];
  }

  const changeProperty: ChangePropertyFn = (key, value) => {
    setIsSaved(false);
    settingsRef.current = { ...settingsRef.current!, [key]: value };
  }

  const setProperties = (value: AppSettings) => {
    setIsSaved(false);
    settingsRef.current = value;
  }

  const saveSettings = () => {
    (async () => {
      const entries = Object.entries(settingsRef.current!) as [keyof AppSettings, AppSettings[keyof AppSettings]][];
      const promises = entries.map(([key, value]) => setConfig(key, value));
      await Promise.all(promises);
    })();
    setIsSaved(true);
    savedSettingRef.current = settingsRef.current;
  }

  const restoreSettings = () => {
    settingsRef.current = savedSettingRef.current;
    setIsSaved(true);
  }

  if (!isLoaded) return null;

  return (
    <SettingsContext.Provider value={{ getProperty, changeProperty, setProperties, saveSettings, isSaved, restoreSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

import { useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import SwitchProperty from './Properties/SwitchProperty';
import SliderProperty from "./Properties/SliderProperty";
import ModelProfileGroup from "./SettintsGroups/ModelProfileGroup";
import ProxyGroup from "./SettintsGroups/ProxyGroup";
import { Separator } from "@/components/ui/separator";

export default function () {
  const { settings, changeSettingsProperty, restoreSettings } = useSettings();
  useEffect(() => restoreSettings(), []);

  return (
    <div className="flex flex-col gap-4 max-w-xl w-[75%] mt-2 mx-auto">

      <ModelProfileGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />
      <Separator className="my-2" />

      <SwitchProperty id='auto-language-switching-switch' label='Auto language switching'
        defaultValue={settings.isAutoLanguageSwitchEnabled}
        onChange={(value) => changeSettingsProperty('isAutoLanguageSwitchEnabled', value)}
        hint="Language swapping after any input" />
      <SwitchProperty id='auto-translate-switch' label='Auto translate'
        defaultValue={settings.isAutoLanguageSwitchEnabled}
        onChange={(value) => changeSettingsProperty('isAutoTranslateEnabled', value)}
        hint="Translation after a small delay without pressing a button." />
      <SliderProperty label="Auto translate delay (ms)" max={2000} step={10}
        defaultValue={settings.autoTranslateDelay}
        onChange={(value) => changeSettingsProperty('autoTranslateDelay', value)}
        hint="Too low value can be dangerous because it could spam provider, which can limit your API." />

      <ProxyGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />

      <br />
    </div>
  )
}

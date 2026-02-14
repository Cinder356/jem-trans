import { useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import SwitchProperty from './Properties/SwitchProperty';
import SliderProperty from "./Properties/SliderProperty";
import ServiceGroup from "./SettintsGroups/ServiceGroup";
import ProxyGroup from "./SettintsGroups/ProxyGroup";

export default function () {
  const { settings, changeSettingsProperty, restoreSettings } = useSettings();
  useEffect(() => restoreSettings(), []);

  return (
    <div className="flex flex-col gap-4 max-w-max w-[80%] mt-2 mx-auto">
      <p className='text-xs leading-tight font-normal opacity-20'>
        This app uses OpenRouter API. So, you need to enter model name and your API key. You can find this on OpenRouter website.
      </p>

      <ServiceGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />

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

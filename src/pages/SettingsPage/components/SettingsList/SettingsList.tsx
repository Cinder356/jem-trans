import { useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import TextProperty from "../TextProperty";
import SwitchProperty from '../SwitchProperty';
import './SettingsList.scss';
import SliderProperty from "../SliderProperty";

export default function () {
  const { getProperty, changeProperty, restoreSettings } = useSettings();

  useEffect(() => restoreSettings(), []);

  return (
    <div className="settings-list">
      <p className='text-xs leading-tight font-normal opacity-20'>
        This app uses OpenRouter API. So, you need to enter model name and your API key. You can find this on OpenRouter website.
      </p>
      <TextProperty id='model-input' label='Model'
        defaultValue={getProperty('model')}
        onChange={(value) => changeProperty('model', value)}
        hint="An LLM model, you can find this on your provider's website" />
      <TextProperty id='api-key-input' label='API Key'
        defaultValue={getProperty('apiKey')}
        onChange={(value) => changeProperty('apiKey', value)}
        hint="A key for making queries to LLM provider. You can find it in your provider's profile." />
      <SwitchProperty id='auto-language-switching-switch' label='Auto language switching'
        defaultValue={getProperty('isAutoLanguageSwitchEnabled')}
        onChange={(value) => changeProperty('isAutoLanguageSwitchEnabled', value)}
        hint="Language swapping after any input" />
      <SwitchProperty id='auto-translate-switch' label='Auto translate'
        defaultValue={getProperty('isAutoTranslateEnabled')}
        onChange={(value) => changeProperty('isAutoTranslateEnabled', value)}
        hint="Translation after a small delay without pressing a button." />
      <SliderProperty label="Auto translate delay (ms)" max={2000} step={10}
        defaultValue={getProperty('autoTranslateDelay')}
        onChange={(value) => changeProperty('autoTranslateDelay', value)}
        hint="Too low value can be dangerous because it could spam provider, which can limit your API." />
      <br />
    </div>
  )
}

import { useState, useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import TextProperty from "../TextProperty";
import SwitchProperty from '../SwitchProperty';
import './SettingsList.scss';
import SliderProperty from "../SliderProperty";
import SelectProperty from "../SelectProperty";

export default function () {
  const { settings, changeSettingsProperty, restoreSettings } = useSettings();
  useEffect(() => restoreSettings(), []);
  const [currentLlmService, setCurrentLlmService] = useState(settings.llmService);

  return (
    <div className="settings-list">
      <p className='text-xs leading-tight font-normal opacity-20'>
        This app uses OpenRouter API. So, you need to enter model name and your API key. You can find this on OpenRouter website.
      </p>
      <SelectProperty label="LLM Service"
        defaultValue={settings.llmService}
        selectItems={[
          { value: 'openrouter', label: 'OpenRouter' },
          { value: 'llama', label: 'Llama' }
        ]}
        onChange={(value) => {
          setCurrentLlmService(value);
          changeSettingsProperty('llmService', value)
        }}
        hint="Where your LLM runs." />
      {['llama'].includes(currentLlmService) &&
        <TextProperty id='service-address-input' label='Service address'
          defaultValue={settings.serviceAddress}
          onChange={(value) => changeSettingsProperty('serviceAddress', value)}
          hint="An address of your service. For local llama server - localhost:8080" />}
      {['openrouter'].includes(currentLlmService) &&
        <TextProperty id='model-input' label='Model'
          defaultValue={settings.model}
          onChange={(value) => changeSettingsProperty('model', value)}
          hint="An LLM model, you can find this on your provider's website" />}
      {['openrouter'].includes(currentLlmService) &&
        <TextProperty id='api-key-input' label='API Key'
          defaultValue={settings.apiKey}
          onChange={(value) => changeSettingsProperty('apiKey', value)}
          hint="A key for making queries to LLM provider. You can find it in your provider's profile." />}
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
      <br />
    </div>
  )
}

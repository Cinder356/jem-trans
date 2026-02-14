import { useState } from 'react';
import TextProperty from "../Properties/TextProperty";
import SelectProperty from "../Properties/SelectProperty";
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";


export default ({ settings, changeSettingsProperty }: SettingsGroupProps) => {
  const [currentLlmService, setCurrentLlmService] = useState(settings.llmService);

  return (
    <>
      <SelectProperty label="LLM Service"
        defaultValue={settings.llmService}
        selectItems={[
          { value: 'OpenRouter', label: 'OpenRouter' },
          { value: 'OpenAiApi', label: 'OpenAI API' }
        ]}
        onChange={(value) => {
          setCurrentLlmService(value);
          changeSettingsProperty('llmService', value)
        }}
        hint="Where your LLM runs." />
      {['OpenAiApi'].includes(currentLlmService) &&
        <TextProperty id='service-address-input' label='Service address'
          defaultValue={settings.serviceAddress}
          onChange={(value) => changeSettingsProperty('serviceAddress', value)}
          hint="An address of your service. For local llama server - localhost:8080" />}
      <TextProperty id='model-input' label='Model'
        defaultValue={settings.model}
        onChange={(value) => changeSettingsProperty('model', value)}
        hint="An LLM model, you can find this on your provider's website" />
      <TextProperty id='api-key-input' label='API Key'
        defaultValue={settings.apiKey} type='password'
        onChange={(value) => changeSettingsProperty('apiKey', value)}
        hint="A key for making queries to LLM provider. You can find it in your provider's profile." />
    </>
  )
}

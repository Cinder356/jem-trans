import { useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import TextProperty from "../TextProperty";
import SwitchProperty from '../SwitchProperty';
import './SettingsList.scss';

export default function () {
  const { getProperty, changeProperty, restoreSettings } = useSettings();

  useEffect(() => restoreSettings(), []);

  return (
    <div className="settings-list">
      <p className='text-xs font-normal opacity-20'>
        This app uses OpenRouter API. So, you need to enter model name and your API key. You can find this on OpenRouter website.
      </p>
      <TextProperty id='model-input' label='Model'
        defaultValue={getProperty('model')}
        onChange={(value) => changeProperty('model', value)} />
      <TextProperty id='api-key-input' label='API Key'
        defaultValue={getProperty('apiKey')}
        onChange={(value) => changeProperty('apiKey', value)} />
      <SwitchProperty id='languages-auto-change-switch' label='Languages auto change'
        defaultValue={getProperty('languagesAutoChange')}
        onChange={(value) => changeProperty('languagesAutoChange', value)} />
    </div>
  )
}

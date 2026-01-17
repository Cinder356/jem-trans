import { AppSettings } from '@/app/stores/settingsStore';

export const DEFAULT_SETTINGS: AppSettings = {
  llmService: 'openrouter',
  model: 'mistralai/devstral-2512:free',
  apiKey: '',
  isAutoLanguageSwitchEnabled: true,
  isAutoTranslateEnabled: false,
  autoTranslateDelay: 700
}

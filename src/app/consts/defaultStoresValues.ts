import { AppSettings } from '@/app/stores/settingsStore';
import { UserMeta } from '../stores/userMetaStore';

export const DEFAULT_SETTINGS: AppSettings = {
  llmService: 'openrouter',
  model: 'mistralai/devstral-2512:free',
  apiKey: '',
  isAutoLanguageSwitchEnabled: true,
  isAutoTranslateEnabled: false,
  autoTranslateDelay: 700
} as const;


export const DEFAULT_USER_META: UserMeta = {
  lastLangPair: { source: 'auto', target: 'eng' },
} as const;

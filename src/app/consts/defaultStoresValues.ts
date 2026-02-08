import { UserMeta } from '../stores/userMetaStore';

export const DEFAULT_USER_META: UserMeta = {
  lastLangPair: { source: 'auto', target: 'eng' },
} as const;

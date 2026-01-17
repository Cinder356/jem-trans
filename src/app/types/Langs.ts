import { languagesByName } from "../consts/languages";

export type LangName = keyof typeof languagesByName;
export type LangCode = (typeof languagesByName)[LangName];

export interface LangPair {
  source: LangCode | 'auto';
  target: LangCode;
}

import type { LangCode } from "../consts/languages";

export interface LangDetectionResult {
  lang_code: LangCode; // "eng", "rus", etc.
  lang_name: string;
  script: string;    // "Latin", "Cyrillic", etc.
  confidence: number;
}

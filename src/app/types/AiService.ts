import { z } from 'zod';
import { AI_SERVICE_KEYS, DEFAULT_AI_SERVICE } from '../consts/aiServices';

export const AiServiceSchema = z
  .enum(AI_SERVICE_KEYS)
  .catch(DEFAULT_AI_SERVICE);
export type AiService = z.infer<typeof AiServiceSchema>;

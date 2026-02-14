import { z } from 'zod';

export const LlmServiceNameSchema = z
  .enum(["OpenRouter", "OpenAiApi"])
  .catch("OpenRouter");
export type LlmServiceName = z.infer<typeof LlmServiceNameSchema>;

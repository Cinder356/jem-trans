import { z } from 'zod';

export const LlmServiceNameSchema = z
  .enum(["OpenRouter", "OpenAiApi"])
  .catch("OpenRouter");
export type LlmServiceName = z.infer<typeof LlmServiceNameSchema>;

export interface ConfigureParams {
  model?: string;
  apiKey?: string;
  address?: string;
  temperature?: number;
}

export interface LlmService {
  configure({ model, apiKey }: ConfigureParams): void;
  generate(prompt: string): Promise<string>;
}

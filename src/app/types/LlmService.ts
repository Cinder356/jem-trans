
export type LlmServiceName = 'openrouter' | 'llama';

export interface ConfigureParams {
  model?: string;
  apiKey?: string;
  address?: string;
}

export interface LlmService {
  configure({ model, apiKey }: ConfigureParams): void;
  generate(prompt: string): Promise<string>;
}

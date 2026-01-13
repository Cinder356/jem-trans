export type LlmServiceName = 'openrouter';

export interface ConfigureParams {
  model?: string;
  apiKey?: string;
}

export interface LlmService {
  configure({ model, apiKey }: ConfigureParams): void;
  generate(prompt: string): Promise<string>;
}

import z from "zod";
import { LlmServiceNameSchema } from "./LlmServiceName";

export const AppSettingsSchema = z.object({
  llmService: LlmServiceNameSchema.default('OpenRouter'),
  serviceAddress: z.string().default('https://api.openai.com/v1/chat/completions'),
  model: z.string().default(''),
  apiKey: z.string().default(''),
  isAutoLanguageSwitchEnabled: z.boolean().default(true),
  isAutoTranslateEnabled: z.boolean().default(false),
  autoTranslateDelay: z.number().min(0).max(5000).default(700),
  isProxyEnabled: z.boolean().default(false),
  proxyProtocol: z.enum(['socks5', 'https']).default('socks5'),
  proxyHost: z.string().default(''),
  proxyPort: z.string().default(''),
  proxyUser: z.string().default(''),
  proxyPass: z.string().default(''),
});
export type AppSettings = z.infer<typeof AppSettingsSchema>;

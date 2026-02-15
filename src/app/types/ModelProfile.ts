import z from "zod";
import { AiServiceSchema } from "./AiService";

export const ModelProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  aiService: AiServiceSchema,
  model: z.string(),
  serviceUrl: z.string(),
  apiKey: z.string(),
  isProxyEnabled: z.boolean().default(false),
});


export type ModelProfile = z.infer<typeof ModelProfileSchema>;


export const AI_SERVICES = {
  openaimanual: {
    label: "Manual OpenAI API",
    url: ""
  },
  openai: {
    label: "OpenAI",
    url: "https://api.openai.com/v1"
  },
  google: {
    label: "Google AI",
    url: ""
  },
  anthropic: {
    label: "Anthropic",
    url: "https://api.anthropic.com/v1"
  },
  mistral: {
    label: "Mistral",
    url: "https://api.mistral.ai/v1"
  },
  openrouter: {
    label: "OpenRouter",
    url: "https://openrouter.ai/api/v1"
  }
} as const;


export const AI_SERVICE_KEYS = Object.keys(AI_SERVICES) as [keyof typeof AI_SERVICES, ...(keyof typeof AI_SERVICES)[]];

export const DEFAULT_AI_SERVICE = AI_SERVICE_KEYS[1];

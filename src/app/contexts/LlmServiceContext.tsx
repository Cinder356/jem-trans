import { createContext, useMemo, type PropsWithChildren } from "react";
import type { LlmService } from "../types/LlmService";
import OpenRouterService from "../llmServices/OpenRouterService";
import LlamaService from "../llmServices/LlamaService";
import useSettings from "../hooks/useSettings";

export const LlmServiceContext = createContext<LlmService | null>(null);

export const LlmServiceProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useSettings();
  const llmService = useMemo(() => {
    let newLlmService: LlmService | null = null;
    switch (settings.llmService) {
      case 'openrouter':
        newLlmService = new OpenRouterService();
        break;
      case 'llama':
        newLlmService = new LlamaService();
    }

    newLlmService.configure({
      model: settings.model,
      apiKey: settings.apiKey,
      address: settings.serviceAddress
    });

    return newLlmService;
  }, [settings]);

  return (
    <LlmServiceContext.Provider value={llmService}>
      {children}
    </LlmServiceContext.Provider>
  )
}

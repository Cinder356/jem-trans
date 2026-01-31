import { createContext, useRef, type PropsWithChildren } from "react";
import { type LlmService } from "../types/LlmService";
import OpenRouterService from "../llmServices/OpenRouterService";
import LlamaService from "../llmServices/LlamaService";
import useSettings from "../hooks/useSettings";

export const LlmServiceContext = createContext<LlmService | null>(null);

export const LlmServiceProvider = ({ children }: PropsWithChildren) => {
  const { getProperty } = useSettings();
  const llmServiceRef = useRef<LlmService | null>(null);

  if (!llmServiceRef.current) {
    // choosing service logic
    const llmServiceName = getProperty('llmService');
    switch (llmServiceName) {
      case 'openrouter':
        llmServiceRef.current = new OpenRouterService();
        break;
      case 'llama':
        llmServiceRef.current = new LlamaService();
    }

    llmServiceRef.current.configure({
      model: getProperty('model'),
      apiKey: getProperty('apiKey'),
      address: getProperty('serviceAddress')
    });
  }

  return (
    <LlmServiceContext.Provider value={llmServiceRef.current}>
      {children}
    </LlmServiceContext.Provider>
  )
}

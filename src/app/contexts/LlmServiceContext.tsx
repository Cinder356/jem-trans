import { createContext, useRef, type PropsWithChildren } from "react";
import { type LlmService } from "../types/LlmService";
import OpenRouterService from "../llmServices/OpenRouterService";
import useSettings from "../hooks/useSettings";

export const LlmServiceContext = createContext<LlmService | null>(null);

export const LlmServiceProvider = ({ children }: PropsWithChildren) => {
  const { getProperty } = useSettings();
  const llmServiceRef = useRef<LlmService | null>(null);

  if (!llmServiceRef.current) {
    // choosing service logic
    // const llmServiceName = getProperty('llmService');

    llmServiceRef.current = new OpenRouterService();

    llmServiceRef.current.configure({
      model: getProperty('model'),
      apiKey: getProperty('apiKey')
    });
  }

  return (
    <LlmServiceContext.Provider value={llmServiceRef.current}>
      {children}
    </LlmServiceContext.Provider>
  )
}

import { createContext, useState, type PropsWithChildren } from "react";
import type { LlmServiceName, LlmService } from "../types/LlmService";
import OpenRouterService from "../llmServices/OpenRouterService";
import LlamaService from "../llmServices/LlamaService";
import useSettings from "../hooks/useSettings";
import type { GetPropertyFn } from "./SettingsContext";

interface LlmServiceValue {
  llmService: LlmService,
  changeLlmService: (llmServiceName: LlmServiceName) => void;
}

export const LlmServiceContext = createContext<LlmServiceValue | null>(null);

const createLlmServiceInstance = (serviceName: LlmServiceName, getSettingsProperty: GetPropertyFn) => {
  let newLlmService: LlmService | null = null;
  switch (serviceName) {
    case 'openrouter':
      newLlmService = new OpenRouterService();
      break;
    case 'llama':
      newLlmService = new LlamaService();
  }

  newLlmService.configure({
    model: getSettingsProperty('model'),
    apiKey: getSettingsProperty('apiKey'),
    address: getSettingsProperty('serviceAddress')
  });

  return newLlmService;
}

export const LlmServiceProvider = ({ children }: PropsWithChildren) => {
  const { getProperty } = useSettings();
  const [llmService, setLlmService] = useState<LlmService>(() => {
    return createLlmServiceInstance(getProperty('llmService'), getProperty)
  });

  const changeLlmService = (llmServiceName: LlmServiceName) => {
    const newService = createLlmServiceInstance(llmServiceName, getProperty);
    setLlmService(newService);
  }

  return (
    <LlmServiceContext.Provider value={{ llmService, changeLlmService }}>
      {children}
    </LlmServiceContext.Provider>
  )
}

import { useEffect } from "react";
import { commands } from "@/bindings";
import useSettings from "./useSettings";
import { AI_SERVICES } from "../consts/aiServices";

export default () => {
  const { settings } = useSettings();

  useEffect(() => {
    const profile = settings.llmProfiles.find(p => p.id === settings.activeLlmProfileId);
    if (!profile) {
      console.error("Couldn't find selected llm profile.");
      return;
    }
    const apiUrl = profile.aiService === 'openaimanual'
      ? profile.serviceUrl
      : AI_SERVICES[profile.aiService].url;
    commands.setLlmConfig(profile.apiKey, apiUrl)
      .catch(err => console.error(err));
  }, [settings.activeLlmProfileId])
}

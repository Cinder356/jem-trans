import { useEffect } from "react";
import { commands } from "@/bindings";
import useSettings from "./useSettings";
import { AI_SERVICES } from "../consts/aiServices";

export default () => {
  const { settings } = useSettings();

  useEffect(() => {
    console.log("Client update")
    const profile = settings.llmProfiles.find(p => p.id === settings.activeLlmProfileId);
    if (!profile) {
      console.error("Couldn't find selected llm profile.");
      return;
    }
    let proxyUrl = null
    if (settings.isProxyEnabled && profile.isProxyEnabled)
      proxyUrl = `${settings.proxyProtocol}://${settings.proxyHost}:${settings.proxyPort}@${settings.proxyUser}:${settings.proxyPass}`
    const apiUrl = profile.aiService === 'openaimanual'
      ? profile.serviceUrl
      : AI_SERVICES[profile.aiService].url;
    commands.setLlmConfig(profile.apiKey, apiUrl, proxyUrl)
      .catch(err => console.error(err));
  }, [
    settings.activeLlmProfileId, settings.llmProfiles, settings.isProxyEnabled,
    settings.proxyHost, settings.proxyPort,
    settings.proxyUser, settings.proxyPass
  ])
}

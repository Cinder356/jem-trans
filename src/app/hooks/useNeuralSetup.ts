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
    if (settings.isProxyEnabled && profile.isProxyEnabled) {
      // Use socks5:// scheme for SOCKS5 proxy, http:// for HTTP proxy
      const scheme = settings.proxyProtocol === 'socks5' ? 'socks5://' : 
                     settings.proxyProtocol === 'socks4' ? 'socks4://' : 'http://';
      proxyUrl = `${scheme}${settings.proxyUser}:${settings.proxyPass}@${settings.proxyHost}:${settings.proxyPort}`
    }
    const apiUrl = profile.aiService === 'openaimanual'
      ? profile.serviceUrl
      : AI_SERVICES[profile.aiService].url;
    commands.setLlmConfig(profile.apiKey, apiUrl, proxyUrl)
      .then(result => {
        if (result.status === 'error')
          console.error(result.error);
      });
  }, [
    settings.activeLlmProfileId, settings.llmProfiles, settings.isProxyEnabled,
    settings.proxyHost, settings.proxyPort, settings.proxyProtocol,
    settings.proxyUser, settings.proxyPass
  ])
}

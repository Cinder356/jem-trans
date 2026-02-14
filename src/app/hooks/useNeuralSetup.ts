import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import useSettings from "./useSettings";

export default () => {
  const { settings } = useSettings();

  useEffect(() => {
    invoke("set_llm_config", {
      apiKey: settings.apiKey,
      apiUrl: settings.serviceAddress
    })
      .catch(err => console.error(err));
  }, [settings.apiKey, settings.serviceAddress])
}

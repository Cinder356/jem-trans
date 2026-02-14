import { useEffect } from "react";
import { commands } from "@/bindings";
import useSettings from "./useSettings";

export default () => {
  const { settings } = useSettings();

  useEffect(() => {
    commands.setLlmConfig(settings.apiKey, settings.serviceAddress)
      .catch(err => console.error(err));
  }, [settings.apiKey, settings.serviceAddress])
}

import { useContext } from "react";
import { TranslationContext } from "../contexts/TranslationContext";



export default () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useLlmService must be used within LlmServiceProvider');
  return context;
}

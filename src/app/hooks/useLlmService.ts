import { useContext } from "react";
import { LlmServiceContext } from "../contexts/LlmServiceContext";


export default () => {
  const context = useContext(LlmServiceContext);
  if (!context) throw new Error('useLlmService must be used within LlmServiceProvider');
  return context;
}

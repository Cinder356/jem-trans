import { useContext } from "react";
import { UserMetaContext } from "../contexts/UserMetaContext";

export default () => {
  const context = useContext(UserMetaContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}

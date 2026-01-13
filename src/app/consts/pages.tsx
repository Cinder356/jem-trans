import SettingsPage from "@/pages/SettingsPage";
import TranslatorPage from "@/pages/TranslatorPage";

const pages = {
  settings: <SettingsPage />,
  translator: <TranslatorPage />
};

export type Page = keyof typeof pages;

export default pages;

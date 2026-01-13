import TranslatorBarActions from "./TranslatorBarActions";
import TranslatorContainer from './TransatorContainer';
import { TranslationProvider } from "../contexts/TranslationContext";

export default function () {
  return (
    <TranslationProvider>
      <TranslatorBarActions />
      <TranslatorContainer />
    </TranslationProvider>
  )
}

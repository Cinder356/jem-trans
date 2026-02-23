import { commands } from '@/bindings';
import useSettings from '@/app/hooks/useSettings';

export default function () {
  const { settings } = useSettings()

  const speak = async (text: string) => {
    const res = await commands.speak(text, settings.voice);
    if (res.status === "error") {
      console.error(res.error);
      return;
    }
  }

  return { speak }
}

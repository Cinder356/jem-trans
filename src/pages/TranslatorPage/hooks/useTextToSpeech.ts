import { commands } from '@/bindings';

export default function () {

  const speak = async (text: string) => {
    const voices = await commands.getVoices();
    if (voices.status === 'error') {
      console.error(voices.error);
      return;
    }
    console.log(`Voices: ${voices.data}`);

    console.log('start of speaking');
    const res = await commands.speak(text, "en-US-AvaMultilingualNeural");
    if (res.status === "error") {
      console.error(res.error);
      return;
    }
    console.log("end of speaking");
  }

  return { speak }
}

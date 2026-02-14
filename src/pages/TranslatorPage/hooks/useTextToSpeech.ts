import { invoke } from "@tauri-apps/api/core";

export default function () {

  const loadVoices = async () => {
    try {
      const voices = await invoke('get_voices') as any[];
      // Фильтруем, например, только русские голоса
      const ruVoices = voices.filter(v => v.Locale.startsWith('ru'));
      console.log(ruVoices);

      // Пример вывода: 
      // [{ ShortName: "ru-RU-DmitryNeural", Gender: "Male", ... }, ...]
    } catch (error) {
      console.error("Ошибка загрузки голосов:", error);
    }
  }


  const speak = async (text: string) => {
    try {
      await invoke('speak', {
        text: text,
        voiceShortName: "ru-RU-DmitryNeural", // Или "ru-RU-SvetlanaNeural"
        rate: "+0%", // Скорость обычная
        pitch: "+0Hz" // Тон обычный
      });
    } catch (error) {
      console.error("TTS error:", error);
    }
  }

  return { speak }
}

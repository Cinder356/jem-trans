import { type LlmService, type ConfigureParams } from "../types/LlmService";


class OpenRouterService implements LlmService {
  private _model: string = '';
  private _apiKey: string = '';

  configure({ model, apiKey }: ConfigureParams): void {
    if (model)
      this._model = model;
    if (apiKey)
      this._apiKey = apiKey;
  }

  async generate(prompt: string): Promise<string> {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this._apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": this._model,
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Пытаемся прочитать ошибку
      throw new Error(`API Error: ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content)
      throw new Error("No content received from API");

    return content;
  }
}



export default OpenRouterService;

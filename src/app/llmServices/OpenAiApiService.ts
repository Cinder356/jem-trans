import { type LlmService, type ConfigureParams } from "../types/LlmService";


class OpenAiApiService implements LlmService {
  private _model: string = '';
  private _address: string = '';
  private _apiKey: string = '';
  private _temperature: number = .6;

  configure({ model, address, apiKey, temperature }: ConfigureParams): void {
    if (model)
      this._model = model;
    if (address)
      this._address = address;
    if (apiKey)
      this._apiKey = apiKey;
    if (temperature)
      this._temperature = temperature;
  }

  async generate(prompt: string): Promise<string> {

    const res = await fetch(this._address, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._apiKey}`
      },
      body: JSON.stringify({
        model: this._model,
        response_format: { type: "json_object" },
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: this._temperature,
      }),
    });


    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Пытаемся прочитать ошибку
      throw new Error(`API Error: ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content)
      throw new Error("No content received from API");

    console.log(content);
    return content;
  }
}

export default OpenAiApiService;

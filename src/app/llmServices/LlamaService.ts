import { type LlmService, type ConfigureParams } from "../types/LlmService";


class LlamaService implements LlmService {
  private _model: string = '';
  private _endpoint: string = '';
  // private _apiKey: string = '';

  configure({ model, address }: ConfigureParams): void {
    if (model)
      this._model = model;
    if (address)
      this._endpoint = `http://${address}/v1/chat/completions`;
    // if (apiKey)
    //   this._apiKey = apiKey;
  }

  async generate(prompt: string): Promise<string> {
    const res = await fetch(this._endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this._model,
        response_format: { type: "json_object" },
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: .5,
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



export default LlamaService;

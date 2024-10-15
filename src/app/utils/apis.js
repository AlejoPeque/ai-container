import hf from "../config/huggingface";

class AiApis {
  static async chatStream(message) {
    let out = "";
    try {
      for await (const chunk of hf.chatCompletionStream({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [{ role: "user", content: message }],
        max_tokens: 500,
        temperature: 0.1,
        seed: 0,
      })) {
        if (chunk.choices && chunk.choices.length > 0) {
          out += chunk.choices[0].delta.content;
        }
      }
      return out;
    } catch (error) {
      console.error("Error in chat stream API:", error);
      throw new Error("Error streaming response from chat API");
    }
  }
}

export default AiApis;

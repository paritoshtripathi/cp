
import openai

class LLMWrapper:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = self.api_key

    def get_response(self, question: str) -> str:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=question,
            max_tokens=150
        )
        return response.choices[0].text.strip()

# Usage in actions.py
llm = LLMWrapper(api_key="your-openai-api-key")

def get_response_from_llm(question: Text) -> Text:
    return llm.get_response(question)
                    
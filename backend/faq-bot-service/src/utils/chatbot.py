
from transformers import pipeline
qa_pipeline = pipeline("question-answering")
def get_response(question):
    context = "Your dynamic context here."
    response = qa_pipeline(question=question, context=context)
    return response
                        
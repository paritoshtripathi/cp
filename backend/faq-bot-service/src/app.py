
from flask import Flask, request, jsonify
from utils import chatbot
app = Flask(__name__)
@app.route('/api/faq', methods=['POST'])
def faq():
    data = request.json
    response = chatbot.get_response(data['question'])
    return jsonify(response)
if __name__ == '__main__':
    app.run(port=8001)
                    
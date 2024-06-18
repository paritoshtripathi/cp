import requests
import os
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

class WhatsAppMessage(BaseModel):
    to: str
    content: str

class OTPMessage(BaseModel):
    to: str
    otp: str

app = FastAPI()

@app.post("/send_message/")
async def send_message(message: WhatsAppMessage):
    return send_whatsapp_message(message.to, message.content)

@app.post("/send_otp/")
async def send_otp(message: OTPMessage):
    content = f"Your OTP is {message.otp}"
    return send_whatsapp_message(message.to, content)

def send_whatsapp_message(to: str, content: str):
    url = f"https://graph.facebook.com/v17.0/{os.getenv('WHATSAPP_PHONE_NUMBER_ID')}/messages"
    headers = {
        "Authorization": f"Bearer {os.getenv('WHATSAPP_API_TOKEN')}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": content}
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082)

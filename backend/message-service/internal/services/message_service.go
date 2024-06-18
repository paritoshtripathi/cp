package services

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type Message struct {
	To      string `json:"to"`
	Content string `json:"content"`
}

func SendToWhatsApp(message Message) {
	payload, _ := json.Marshal(message)
	_, err := http.Post("http://whatsapp-api:8000/send_message/", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		// Handle error
	}
}

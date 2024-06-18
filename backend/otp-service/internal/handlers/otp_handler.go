package handlers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/IBM/sarama"
)

type OTPMessage struct {
	To  string `json:"to"`
	OTP string `json:"otp"`
}

func StartConsumer() {
	brokers := []string{"localhost:8081"}
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	master, err := sarama.NewConsumer(brokers, config)
	if err != nil {
		log.Fatalf("Failed to start Kafka consumer: %s", err)
	}
	defer master.Close()

	consumer, err := master.ConsumePartition("otp-topic", 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatalf("Failed to consume Kafka partition: %s", err)
	}
	defer consumer.Close()

	for msg := range consumer.Messages() {
		var otpMessage OTPMessage
		if err := json.Unmarshal(msg.Value, &otpMessage); err != nil {
			log.Printf("Failed to unmarshal message: %s", err)
			continue
		}

		sendToWhatsApp(otpMessage)
	}
}

func sendToWhatsApp(otpMessage OTPMessage) {
	payload, _ := json.Marshal(otpMessage)
	_, err := http.Post("http://whatsapp-api:8000/send_otp/", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		log.Printf("Failed to send OTP to WhatsApp API: %s", err)
	}
}

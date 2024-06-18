package handlers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/IBM/sarama"
)

type Message struct {
	To      string `json:"to"`
	Content string `json:"content"`
}

func StartConsumer() {
	brokers := []string{"localhost:8080"}
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	master, err := sarama.NewConsumer(brokers, config)
	if err != nil {
		log.Fatalf("Failed to start Kafka consumer: %s", err)
	}
	defer master.Close()

	consumer, err := master.ConsumePartition("contact-topic", 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatalf("Failed to consume Kafka partition: %s", err)
	}
	defer consumer.Close()

	for msg := range consumer.Messages() {
		var message Message
		if err := json.Unmarshal(msg.Value, &message); err != nil {
			log.Printf("Failed to unmarshal message: %s", err)
			continue
		}

		sendToWhatsApp(message)
	}
}

func sendToWhatsApp(message Message) {
	payload, _ := json.Marshal(message)
	_, err := http.Post("http://whatsapp-api:8000/send_message/", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		log.Printf("Failed to send message to WhatsApp API: %s", err)
	}
}

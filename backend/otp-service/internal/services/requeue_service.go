package services

import (
	"log"

	"github.com/IBM/sarama"
)

func RequeueMessage(brokers []string, topic string, message []byte) {
	config := sarama.NewConfig()
	producer, err := sarama.NewSyncProducer(brokers, config)
	if err != nil {
		log.Fatalf("Failed to start Kafka producer: %s", err)
	}
	defer producer.Close()

	msg := &sarama.ProducerMessage{
		Topic: topic,
		Value: sarama.ByteEncoder(message),
	}

	_, _, err = producer.SendMessage(msg)
	if err != nil {
		log.Printf("Failed to requeue message to Kafka: %s", err)
	}
}

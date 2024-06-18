package services

import (
	"log"

	"github.com/IBM/sarama"
)

func StartConsumer(brokers []string, topic string) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	master, err := sarama.NewConsumer(brokers, config)
	if err != nil {
		log.Fatalf("Failed to start Kafka consumer: %s", err)
	}
	defer master.Close()

	consumer, err := master.ConsumePartition(topic, 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatalf("Failed to consume Kafka partition: %s", err)
	}
	defer consumer.Close()

	for msg := range consumer.Messages() {
		processMessage(msg.Value)
	}
}

func processMessage(msg []byte) {
	// Process the OTP message
}

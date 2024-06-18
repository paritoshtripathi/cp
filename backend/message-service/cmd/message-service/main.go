//go:build linux || darwin
// +build linux darwin

package main

import (
	"log"
	"message-service/internal/handlers"
)

func main() {
	log.Println("Starting message service...")
	handlers.StartConsumer()
}

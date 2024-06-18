//go:build linux || darwin
// +build linux darwin

package main

import (
	"log"
	"otp-service/internal/handlers"
)

func main() {
	log.Println("Starting otp service...")
	handlers.StartConsumer()
}

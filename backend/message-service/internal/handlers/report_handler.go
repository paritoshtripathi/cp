//go:build linux || darwin
// +build linux darwin

package handlers

import (
	"message-service/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetReport(c *gin.Context) {
	report, err := services.GenerateReport()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, report)
}

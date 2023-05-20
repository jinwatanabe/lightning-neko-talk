package handler

import "github.com/gin-gonic/gin"

type SystemHandler struct {}

func (h SystemHandler) Ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
} 

func NewSystemHandler() *SystemHandler {
	return &SystemHandler{}
}
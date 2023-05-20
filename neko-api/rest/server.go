package rest

import (
	"main/rest/handler"

	"github.com/gin-gonic/gin"
)

func NewServer() *gin.Engine {
	r := gin.Default()
	v1 := r.Group("/v1")

	{
		systemHandler := handler.NewSystemHandler()
		v1.GET("/system/ping", systemHandler.Ping)
	}

	return r
}
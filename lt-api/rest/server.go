package rest

import (
	"main/di"
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

	groups := v1.Group("/groups")
	{

		groupHandler := di.InitGroupHandler()
		groups.GET("", groupHandler.GetAll)
		groups.GET("/:id", groupHandler.GetByID)
		groups.POST("",groupHandler.Create)
	}

	
	return r
}
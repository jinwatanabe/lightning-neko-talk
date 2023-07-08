package rest

import (
	"main/di"
	"main/rest/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewServer() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"https://api-image-kllnys4xfq-uc.a.run.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PATCH",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))
	v1 := r.Group("/v1")

	{
		systemHandler := handler.NewSystemHandler()
		v1.GET("/systems/ping", systemHandler.Ping)
	}

	groups := v1.Group("/groups")
	{

		groupHandler := di.InitGroupHandler()
		groups.GET("", groupHandler.GetAll)
		groups.GET("/:id", groupHandler.GetByID)
		groups.POST("",groupHandler.Create)
		groups.PATCH("/:id",groupHandler.Update)
		groups.DELETE("/:id",groupHandler.Delete)
	}

	
	return r
}
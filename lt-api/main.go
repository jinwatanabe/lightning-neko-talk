package main

import "main/rest"

func main() {
	// r := gin.Default()

	// r.GET("/v1/system/ping", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "pong",
	// 	})
	// })

	// r.Run(":8080")

	// ginを用意する
	// pingのエンドポイントを用意する
	s := rest.NewServer()

	s.Run()
}
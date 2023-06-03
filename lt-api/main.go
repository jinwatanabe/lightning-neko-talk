package main

import (
	"main/config"
	"main/rest"
)

func main() {

	config.InitConfig()
	s := rest.NewServer()

	s.Run()
}
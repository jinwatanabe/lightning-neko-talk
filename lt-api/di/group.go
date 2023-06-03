package di

import (
	"main/driver"
	"main/gateway"
	"main/rest/handler"
	"main/usecase"
)

func InitGroupHandler() *handler.GroupHandler {
	db := driver.ProvidedDatabaseConnection()
	driver :=  driver.ProvideGroupDriver(db)
	gateway := gateway.ProvideGroupPort(driver)
	usecase := usecase.ProvideGroupUsecase(gateway)
	handler := handler.ProvideGroupHandler(usecase)

	return handler
}
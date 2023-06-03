package driver

import (
	"fmt"
	"main/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ProvidedDatabaseConnection() *gorm.DB {
	dbConfig := config.GetConfig().Database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/neko?charset=utf8&parseTime=true", dbConfig.User, dbConfig.Password, dbConfig.Host, dbConfig.Port)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	return db
}
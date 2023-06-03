package driver

import (
	"fmt"
	"main/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ProvidedDatabaseConnection() *gorm.DB {
	dbConfig := config.GetConfig().Database

	var dsn string

	if environment := config.Environment(); environment != "production" {
		dsn = fmt.Sprintf("%s:%s@tcp(%s:%d)/neko?charset=utf8&parseTime=true", dbConfig.User, dbConfig.Password, dbConfig.Host, dbConfig.Port)
	} else {
		dsn = fmt.Sprintf("%s:%s@tcp(%s)/%s?tls=true", dbConfig.User, dbConfig.Password, dbConfig.Host, dbConfig.DBName)
	}
	
		db, err := gorm.Open(mysql.New(mysql.Config{
			DSN: dsn,
		}), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	return db
}
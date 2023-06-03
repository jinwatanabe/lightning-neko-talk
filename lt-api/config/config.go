package config

import (
	"os"
	"strconv"
)

var config *Config

type DatabaseConfig struct {
	DBName string
	User string
	Password string
	Host string
	Port int
}

type Config struct {
	Database DatabaseConfig
}

func InitConfig() {
	config = &Config {
		Database: getDatabaseConfig(),
	}
}

func GetConfig() *Config {
	return config
}

func getDatabaseConfig() DatabaseConfig {
	port, _ := strconv.Atoi(os.Getenv("DB_PORT"))
	return DatabaseConfig {
		DBName: os.Getenv("DB_NAME"),
		User: os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Host: os.Getenv("DB_HOST"),
		Port: port,
	}
}

func Environment() string {
	return os.Getenv("ENVIRONMENT")
}
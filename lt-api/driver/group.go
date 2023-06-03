package driver

import (
	"time"

	"gorm.io/gorm"
)

type GroupDriver interface {
	GetAll() ([]Group,error)
}

type GroupDriverImpl struct {
	conn *gorm.DB
}

func (t GroupDriverImpl) GetAll() ([]Group, error){
	groups := []Group{}
	t.conn.Find(&groups)

	return groups, nil
}

func ProvideGroupDriver(conn *gorm.DB) GroupDriver {
	return &GroupDriverImpl{conn: conn}
}

type Group struct {
	Id int `gorm:"primaryKey"`
	Name string `gorm:"size:255"`
	Description string `gorm:"size:255"`
	Date time.Time `gorm:"type:datetime"`
}
package driver

import (
	"time"

	"gorm.io/gorm"
)

type GroupDriver interface {
	GetAll() ([]Group,error)
	GetByID(id int) (Group,error)
	Create(GroupJson) error
	Update(id int, groupJson GroupJson) error
}

type GroupDriverImpl struct {
	conn *gorm.DB
}

func (t GroupDriverImpl) GetAll() ([]Group, error){
	groups := []Group{}
	t.conn.Find(&groups)

	return groups, nil
}

func (t GroupDriverImpl) GetByID(id int) (Group, error) {
	group := Group{}
	t.conn.First(&group, id)

	return group, nil
}

func (t GroupDriverImpl) Create(groupJson GroupJson) error {
	err := t.conn.Create(&groupJson)
	return err.Error
}

func (t GroupDriverImpl) Update(id int, groupJson GroupJson) error {
	err := t.conn.Model(&Group{}).Where("id = ?", id).Updates(&groupJson)
	return err.Error
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

type GroupJson struct {
	Name string 
	Description string
	Date time.Time
}

func (GroupJson) TableName() string {
	return "groups"
}
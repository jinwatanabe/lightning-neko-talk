package gateway

import (
	"main/driver"

	"github.com/stretchr/testify/mock"
)

type MockGroupDriver struct {
	mock.Mock
}

func (m MockGroupDriver) GetAll() ([]driver.Group, error) {
	args := m.Called()
	return args.Get(0).([]driver.Group), args.Error(1)
}

func (m MockGroupDriver) GetByID(id int) (driver.Group, error) {
	args := m.Called(id)
	return args.Get(0).(driver.Group), args.Error(1)
}

func (m MockGroupDriver) Create(groupJson driver.GroupJson) error {
	args := m.Called(groupJson)
	return args.Error(0)
}

func (m MockGroupDriver) Update(id int, groupJson driver.GroupJson) error {
	args := m.Called(id, groupJson)
	return args.Error(0)
}
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
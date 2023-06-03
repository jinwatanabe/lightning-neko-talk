package usecase

import (
	"main/domain"

	"github.com/stretchr/testify/mock"
)

type MockGroupPort struct {
	mock.Mock
}

func (m MockGroupPort) GetAll() ([]domain.Group, error) {
	args := m.Called()
	return args.Get(0).([]domain.Group), args.Error(1)
}
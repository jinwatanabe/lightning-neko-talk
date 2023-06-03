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

func (m MockGroupPort) GetByID(id domain.GroupId) (domain.Group, error) {
	args := m.Called(id)
	return args.Get(0).(domain.Group), args.Error(1)
}

func (m MockGroupPort) Create(groupJson domain.GroupJson) error {
	args := m.Called(groupJson)
	return args.Error(0)
}

func (m MockGroupPort) Update(id domain.GroupId, groupJson domain.GroupJson) error {
	args := m.Called(id, groupJson)
	return args.Error(0)
}

func (m MockGroupPort) Delete(id domain.GroupId) error {
	args := m.Called(id)
	return args.Error(0)
}
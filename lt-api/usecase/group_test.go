package usecase

import (
	"main/domain"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_GetAll(t *testing.T){
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	groupPort.On("GetAll").Return([]domain.Group{}, nil)
	actual, _ := usecase.GetAll()
	assert.Equal(t, []domain.Group{}, actual)
}
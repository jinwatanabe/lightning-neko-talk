package usecase

import (
	"main/domain"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func Test_GetAll(t *testing.T){
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	groupPort.On("GetAll").Return([]domain.Group{}, nil)
	actual, _ := usecase.GetAll()
	assert.Equal(t, []domain.Group{}, actual)
}

func Test_GetByID(t *testing.T){
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	id := domain.GroupId{ Value: 1 }
	groupPort.On("GetByID", id).Return(domain.Group{}, nil)
	actual, _ := usecase.GetByID(id)
	assert.Equal(t, domain.Group{}, actual)
}

func Test_Create(t *testing.T) {
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	groupJson := domain.GroupJson{
		Name: domain.GroupName{Value: "name"},
		Description: domain.GroupDescription{Value: "description"},
		Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)},
	}
	groupPort.On("Create", groupJson).Return(nil)
	err := usecase.Create(groupJson)
	assert.Equal(t,nil,err)
}

func Test_Update(t *testing.T) {
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	groupJson := domain.GroupJson{
		Name: domain.GroupName{Value: "name"},
		Description: domain.GroupDescription{Value: "description"},
		Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)},
	}
	id := domain.GroupId{ Value: 1 }
	groupPort.On("Update", id, groupJson).Return(nil)
	err := usecase.Update(id, groupJson)
	assert.Equal(t,nil,err)
}

func Test_Delete(t *testing.T){
	groupPort := new(MockGroupPort)
	usecase := GroupUsecase{groupPort}
	id := domain.GroupId{Value: 1}
	groupPort.On("Delete",id).Return(nil)
	err := usecase.Delete(id)
	assert.Equal(t,nil,err)
}
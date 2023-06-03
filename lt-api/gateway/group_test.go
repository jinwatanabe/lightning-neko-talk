package gateway

import (
	"main/domain"
	"main/driver"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func Test_GetAll(t *testing.T){
	mockDriver := new(MockGroupDriver)
	gateway := GroupGateway{mockDriver}
	groups := []driver.Group{ 
		{Id: 1, Name: "test", Description: "test", Date: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)},
	}

	expected := []domain.Group{
		{Id: domain.GroupId{Value: 1}, Name: domain.GroupName{Value: "test"}, Description: domain.GroupDescription{Value: "test"}, Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}},
	}

	mockDriver.On("GetAll").Return(groups, nil)
	actual, _ := gateway.GetAll()
	assert.Equal(t, expected, actual)
}

func Test_GetByID(t *testing.T){
	mockDriver := new(MockGroupDriver)
	gateway := GroupGateway{mockDriver}
	id := domain.GroupId{Value: 1}
	group := driver.Group{Id: 1, Name: "test", Description: "test", Date: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}
	mockDriver.On("GetByID", 1).Return(group, nil)
	actual, _ := gateway.GetByID(id)
	expected := domain.Group{Id: domain.GroupId{Value: 1}, Name: domain.GroupName{Value: "test"}, Description: domain.GroupDescription{Value: "test"}, Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}}
	assert.Equal(t, expected, actual)
}


func Test_Create(t *testing.T) {
	mockDriver := new(MockGroupDriver)
	gateway := GroupGateway{mockDriver}
	groupJson := domain.GroupJson{Name: domain.GroupName{Value: "test"}, Description: domain.GroupDescription{Value: "test"}, Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}}
	driverJson := driver.GroupJson{Name: "test", Description: "test", Date: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}
	mockDriver.On("Create",driverJson).Return(nil)
	err := gateway.Create(groupJson)
	assert.Equal(t,nil,err)
}

func Test_Update(t *testing.T) {
	mockDriver := new(MockGroupDriver)
	gateway := GroupGateway{mockDriver}
	groupJson := domain.GroupJson{Name: domain.GroupName{Value: "test"}, Description: domain.GroupDescription{Value: "test"}, Date: domain.GroupDate{Value: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}}
	id := domain.GroupId{Value: 1}
	driverJson := driver.GroupJson{Name: "test", Description: "test", Date: time.Date(2022, 4, 1, 9, 0, 0, 0, time.Local)}
	mockDriver.On("Update", 1, driverJson).Return(nil)
	err := gateway.Update(id, groupJson)
	assert.Equal(t,nil,err)
}

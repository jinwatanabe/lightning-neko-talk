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
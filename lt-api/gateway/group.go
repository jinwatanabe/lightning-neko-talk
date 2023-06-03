package gateway

import (
	"main/domain"
	"main/driver"
)

type GroupGateway struct {
	groupDriver driver.GroupDriver
}

func (t GroupGateway)GetAll() ([]domain.Group,error){
	result, err := t.groupDriver.GetAll()

	if err != nil {
		return nil, err
	}

	var groups []domain.Group

	for _, t := range result {
		group := domain.Group{
			Id: domain.GroupId{Value: t.Id},
			Name: domain.GroupName{Value: t.Name},
			Description: domain.GroupDescription{Value: t.Description},
			Date: domain.GroupDate{Value: t.Date},
		}
		groups = append(groups, group)
	}

	return groups,nil
}

func ProvideGroupPort(groupDriver driver.GroupDriver) GroupGateway {
	return GroupGateway{groupDriver}
}
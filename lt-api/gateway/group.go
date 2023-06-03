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

func (t GroupGateway)GetByID(id domain.GroupId) (domain.Group, error) {
	groupId := id.Value
	result, err := t.groupDriver.GetByID(groupId)

	if err != nil {
		return domain.Group{}, err
	}
	group := domain.Group{
		Id: domain.GroupId{Value: result.Id},
		Name: domain.GroupName{Value: result.Name},
		Description: domain.GroupDescription{Value: result.Description},
		Date: domain.GroupDate{Value: result.Date},
	}
	return group, nil
}

func (t GroupGateway) Create(groupJson domain.GroupJson) error {
	driverJson := driver.GroupJson{
		Name: groupJson.Name.Value,
		Description: groupJson.Description.Value,
		Date: groupJson.Date.Value,
	}

	err := t.groupDriver.Create(driverJson)
	return err
}

func (t GroupGateway) Update(id domain.GroupId, groupJson domain.GroupJson) error {
	i := id.Value
	driverJson := driver.GroupJson{
		Name: groupJson.Name.Value,
		Description: groupJson.Description.Value,
		Date: groupJson.Date.Value,
	}

	err := t.groupDriver.Update(i, driverJson)
	return err
}

func ProvideGroupPort(groupDriver driver.GroupDriver) GroupGateway {
	return GroupGateway{groupDriver}
}
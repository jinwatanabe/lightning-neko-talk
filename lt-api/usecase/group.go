package usecase

import (
	"main/domain"
	"main/usecase/port"
)

type GroupUsecase struct {
	groupPort port.GroupPort
}

func (u GroupUsecase) GetAll() ([]domain.Group,error){
	groups, err := u.groupPort.GetAll()

	if err != nil {
		return nil, err
	}	

	return groups,nil
}

func (u GroupUsecase) GetByID(id domain.GroupId) (domain.Group,error){
	group, err := u.groupPort.GetByID(id)

	if err != nil {
		return domain.Group{}, err
	}	

	return group,nil
}

func (u GroupUsecase) Create(groupJson domain.GroupJson) error {
	err := u.groupPort.Create(groupJson)
	return err
}

func (u GroupUsecase) Update(id domain.GroupId, groupJson domain.GroupJson) error {
	err := u.groupPort.Update(id, groupJson)
	return err
}

func (u GroupUsecase) Delete(id domain.GroupId) error {
	err := u.groupPort.Delete(id)
	return err
}

func ProvideGroupUsecase(groupPort port.GroupPort) GroupUsecase {
	return GroupUsecase{groupPort}
}
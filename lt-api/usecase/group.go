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

func ProvideGroupUsecase(groupPort port.GroupPort) GroupUsecase {
	return GroupUsecase{groupPort}
}
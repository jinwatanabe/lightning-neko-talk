package port

import "main/domain"

type GroupPort interface {
	GetAll() ([]domain.Group,error)
	GetByID(id domain.GroupId) (domain.Group,error)
	Create(groupJson domain.GroupJson) error
}
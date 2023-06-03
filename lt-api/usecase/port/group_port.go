package port

import "main/domain"

type GroupPort interface {
	GetAll() ([]domain.Group,error)
	
}
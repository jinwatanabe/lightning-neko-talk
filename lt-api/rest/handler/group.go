package handler

import (
	"main/domain"
	"main/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GroupHandler struct {
	groupUsecase usecase.GroupUsecase
}

func (h GroupHandler) GetAll(c *gin.Context) {
	groups, err := h.groupUsecase.GetAll()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	response := GroupsResponse{
		Groups: groups,
	}
	c.JSON(http.StatusOK, response)
}

func ProvideGroupHandler(groupUsecase usecase.GroupUsecase) *GroupHandler {
	return &GroupHandler{
		groupUsecase: groupUsecase,
	}
}

type GroupsResponse struct {
	Groups []domain.Group `json:"groups"`
}

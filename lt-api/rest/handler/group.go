package handler

import (
	"main/domain"
	"main/extension"
	"main/usecase"
	"net/http"
	"strconv"

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

	groupsJson := make([]GroupJson, len(groups))
	for i, group := range groups {
		groupsJson[i] = groupToGroupJson(group)
	}

	response := GroupsResponse{
		Groups: groupsJson,
	}
	c.JSON(http.StatusOK, response)
}

func (h GroupHandler) GetByID(c *gin.Context) {
	i, _ := strconv.Atoi(c.Param("id"))
	id := domain.GroupId{ Value: i }
	group, err := h.groupUsecase.GetByID(id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if group.Name.Value == "" {
		c.JSON(204, gin.H{"not found group": err.Error()})
		return
	}

	response := GroupResponse {
		Group: groupToGroupJson(group),
	}
	c.JSON(http.StatusOK, response)
}

func (h GroupHandler) Create(c *gin.Context){
	name := c.PostForm("name")
	description := c.PostForm("description")
	date := c.PostForm("date")
	
	groupJson := domain.GroupJson{
		Name: domain.GroupName{Value:  name},
		Description: domain.GroupDescription{Value: description},
		Date: domain.GroupDate{Value: extension.StringToDate(date)},
	}

	err := h.groupUsecase.Create(groupJson)
	if err != nil {
		c.JSON(500, MessageResponse{Message: err.Error()})
		return
	}
	
	c.JSON(200, MessageResponse{Message: "success!"})
}

func (h GroupHandler) Update(c *gin.Context){
	id := c.Param("id")
	name := c.PostForm("name")
	description := c.PostForm("description")
	date := c.PostForm("date")
	if name == "" && description == "" && date == "" {
		c.JSON(400, MessageResponse{Message: "no data"})
		return
	}

	i, _ := strconv.Atoi(id)
	groupId := domain.GroupId{ Value: i}
	groupJson := domain.GroupJson{
		Name: domain.GroupName{Value:  name},
		Description: domain.GroupDescription{Value: description},
		Date: domain.GroupDate{Value: extension.StringToDate(date)},
	}
	err := h.groupUsecase.Update(groupId, groupJson)

	if err != nil {
		c.JSON(500, MessageResponse{Message: err.Error()})
		return
	}
	c.JSON(200, MessageResponse{Message: "success!"})
}

func (h GroupHandler) Delete(c *gin.Context){
	id := c.Param("id")

	i, _ := strconv.Atoi(id)
	groupId := domain.GroupId{Value: i}
	err := h.groupUsecase.Delete(groupId)
	if err != nil {
		c.JSON(500, MessageResponse{Message: err.Error()})
		return
	}

	c.JSON(200, MessageResponse{Message: "success!"})
}

func ProvideGroupHandler(groupUsecase usecase.GroupUsecase) *GroupHandler {
	return &GroupHandler{
		groupUsecase: groupUsecase,
	}
}

func groupToGroupJson(group domain.Group) GroupJson {
	return GroupJson{
		Id: group.Id.Value,
		Name: group.Name.Value,
		Description: group.Description.Value,
		Date: extension.DateToString(group.Date.Value),
	}
}

type GroupJson struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Date string `json:"date"`
}

type GroupsResponse struct {
	Groups []GroupJson `json:"groups"`
}

type GroupResponse struct {
	Group GroupJson `json:"group"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

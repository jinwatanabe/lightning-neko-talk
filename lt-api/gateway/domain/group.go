package domain

import "time"

type Group struct {
	Id GroupId `json:"id"`
	Name GroupName `json:"name"`
	Description GroupDescription `json:"description"`
	Date GroupDate `json:"date"`
}

type GroupId struct {
	Value int `json:"value"`
}

type GroupName struct {
	Value string `json:"value"`
}

type GroupDescription struct {
	Value string `json:"value"`
}

type GroupDate struct {
	Value time.Time `json:"value"`
}

type GroupJson struct {
	Name GroupName `json:"name"`
	Description GroupDescription `json:"description"`
	Date GroupDate `json:"date"`
}
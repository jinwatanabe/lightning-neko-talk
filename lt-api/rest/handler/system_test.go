package handler_test

import (
	"main/rest"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_System(t *testing.T) {
	r := rest.NewServer()

	w := httptest.NewRecorder()
	req , _ := http.NewRequest("GET", "/v1/system/ping", nil)
	r.ServeHTTP(w,req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "{\"message\":\"pong\"}", w.Body.String())
}
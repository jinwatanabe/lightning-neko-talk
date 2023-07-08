package extension

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func Test_DateToString(t *testing.T) {
	const layout = "2006-01-02 15:04:05"
	str := "2022-04-01 09:00:00"
	time,  _ := time.Parse(layout, str)
	result := DateToString(time)
	assert.Equal(t, "2022-04-01 09:00:00", result)
}
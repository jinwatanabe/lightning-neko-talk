package extension

import "time"

func StringToDate(str string) time.Time {
	const layout = "2006-01-02 15:04:05"
	t, _ := time.Parse(layout, str)
	return t
}

func DateToString(date time.Time) string {
	const layout = "2006-01-02 15:04:05"

	return date.Format(layout)
}
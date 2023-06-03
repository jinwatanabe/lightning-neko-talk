FROM golang:1.20.4-alpine3.18

WORKDIR /app

ARG DB_USER
ARG DB_PASSWORD

ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}

COPY ./ ./
RUN go mod download

RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server

EXPOSE 8080

CMD DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} DB_HOST=aws.connect.psdb.cloud DB_PORT=3306 DB_DATABASE=appdb01 ENVIRONMENT=production ./server
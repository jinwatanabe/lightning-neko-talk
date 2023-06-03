FROM golang:1.20.4-alpine3.18

WORKDIR /app

COPY ./ ./
RUN go mod download

RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server

EXPOSE 8080

CMD DB_USER=1r9xysz86pcrdhanetg2 DB_PASSWORD=pscale_pw_Cl4G6q5RARJ38TWFBAzc1XlILgGkOp4kuKamoaRK8qk DB_HOST=aws.connect.psdb.cloud DB_PORT=3306 DB_DATABASE=appdb01 ENVIRONMENT=production ./server
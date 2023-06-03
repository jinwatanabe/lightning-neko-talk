run:
	DB_USER=root DB_PASSWORD=password DB_HOST=localhost DB_PORT=3306 DB_NAME=neko ENVIORONNMENT=dev go run .
test:
	go test ./...
push:
	docker build -t us-west1-docker.pkg.dev/lightning-neko-talk/lt-api/api-image:latest . && \
	docker push us-west1-docker.pkg.dev/lightning-neko-talk/lt-api/api-image:latest

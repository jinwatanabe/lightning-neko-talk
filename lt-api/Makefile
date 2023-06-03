IMAGE = asia-northeast1-docker.pkg.dev/`gcloud config get-value project`/cloud-run/column-cloudrun-nodejs

run:
	DB_USER=root DB_PASSWORD=password DB_HOST=localhost DB_PORT=3306 DB_NAME=neko ENVIORONNMENT=dev go run .
test:
	DB_USER=root DB_PASSWORD=password DB_HOST=localhost DB_PORT=3306 go test ./...

push:
	docker image push $(IMAGE)

deploy:
	gcloud run deploy column-cloudrun-go \
		--image $(IMAGE) \
		--region asia-northeast1 \
		--platform managed \
		--allow-unauthenticated

staging: build tag push deploy

delete:
	gcloud run services delete column-cloudrun-go \
		--region asia-northeast1 \
		--platform managed
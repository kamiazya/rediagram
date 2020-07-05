.PHONY: build

NAME=rediagram
VERSION=$(shell cat package.json | jq -r -c '.version')

build:
	docker build -t $(NAME):$(VERSION) .

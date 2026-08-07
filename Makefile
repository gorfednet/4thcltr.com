# 4thcltr.com — typecheck, build (Vite), deploy to SMB

SHELL := /bin/bash
DIST := dist
-include .deploy-env

.PHONY: build deploy clean install

install:
	npm ci

build: install
	@echo "Building $(DIST)/ with Vite..."
	npm run build
	@echo "Build done: $(DIST)/"

deploy: build
	@./deploy-to-smb.sh

clean:
	rm -rf $(DIST) node_modules/.vite

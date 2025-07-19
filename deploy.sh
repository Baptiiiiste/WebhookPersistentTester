#!/bin/bash

REGISTRY="docker.isima.fr"
IMAGE_NAME="babonneau/echo"
TAG="latest"

# Build pour linux/amd64 (compatible Portainer)
docker buildx build --platform linux/amd64 -t $IMAGE_NAME:$TAG .

# Tag pour registry
docker tag $IMAGE_NAME:$TAG $REGISTRY/$IMAGE_NAME:$TAG

# Login interactif
docker login $REGISTRY

# Push vers la registry
docker push $REGISTRY/$IMAGE_NAME:$TAG

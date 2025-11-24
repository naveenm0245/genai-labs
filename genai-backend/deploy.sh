#!/bin/bash

set -e

PROJECT_ID=${GCP_PROJECT_ID:-"thumbnail-backend"}
REGION=${GCP_REGION:-"us-central1"}
SERVICE_NAME=${SERVICE_NAME:-"genai-backend"}
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

if [ ! -f ".env" ]; then
    echo "Error: .env file not found"
    exit 1
fi

echo "Configuring gcloud project..."
gcloud config set project ${PROJECT_ID}

echo "Enabling required APIs..."
gcloud services enable run.googleapis.com containerregistry.googleapis.com --quiet

echo "Configuring Docker for GCR..."
gcloud auth configure-docker gcr.io --quiet

echo "Building Docker image for linux/amd64 (Apple Silicon compatible)..."
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME} --load .

echo "Pushing image to GCR..."
docker push ${IMAGE_NAME}

echo "Reading environment variables from .env..."
ENV_VARS=()

while IFS= read -r line || [ -n "$line" ]; do
    line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    if [[ -n "$line" && ! "$line" =~ ^#.* && "$line" =~ ^[^=]+= ]]; then
        key="${line%%=*}"
        value="${line#*=}"
        key=$(echo "$key" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        value=$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        value=$(echo "$value" | sed "s/^['\"]//;s/['\"]$//")
        if [ -n "$key" ]; then
            ENV_VARS+=("${key}=${value}")
        fi
    fi
done < .env

echo "Deploying to Cloud Run..."
if [ ${#ENV_VARS[@]} -gt 0 ]; then
    OLD_IFS=$IFS
    IFS=','
    ENV_STR="${ENV_VARS[*]}"
    IFS=$OLD_IFS
    gcloud run deploy ${SERVICE_NAME} \
        --image ${IMAGE_NAME} \
        --platform managed \
        --region ${REGION} \
        --allow-unauthenticated \
        --set-env-vars "${ENV_STR}" \
        --port 8080 \
        --memory 512Mi \
        --cpu 1 \
        --timeout 300 \
        --max-instances 10
else
    gcloud run deploy ${SERVICE_NAME} \
        --image ${IMAGE_NAME} \
        --platform managed \
        --region ${REGION} \
        --allow-unauthenticated \
        --port 8080 \
        --memory 512Mi \
        --cpu 1 \
        --timeout 300 \
        --max-instances 10
fi

echo "Deployment complete!"
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)')
echo "Service URL: ${SERVICE_URL}"


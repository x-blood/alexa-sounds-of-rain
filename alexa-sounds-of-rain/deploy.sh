#!/bin/sh

# Create Package
aws cloudformation package \
  --template-file deploy.yml \
  --output-template-file deploy-output.yml \
  --s3-bucket alexa-sounds-of-rain-package \
  --profile handson20180323

# Deploy
aws cloudformation deploy \
  --template-file deploy-output.yml \
  --stack-name alexa-sounds-of-rain-sam \
  --parameter-overrides \
  LambdaFunctionVersion=1.00 \
  SoundFileBaseUrl=${ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_URL} \
  SoundFileBaseName=${ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_NAME} \
  AppId=${ALEXA_SOUNDS_OF_RAIN_APP_ID} \
  --capabilities CAPABILITY_IAM \
  --profile handson20180323

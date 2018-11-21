#!/bin/sh

# Create Package
aws cloudformation package \
  --template-file template.yml \
  --output-template-file template-output.yml \
  --s3-bucket alexa-sounds-of-rain-package \
  --profile xblood

# Deploy
aws cloudformation deploy \
  --template-file template-output.yml \
  --stack-name alexa-sounds-of-rain-sam \
  --parameter-overrides \
  LambdaFunctionVersion=1.00 \
  SoundFileBaseUrl=${ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_URL} \
  SoundFileBaseName=${ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_NAME} \
  AppId=${ALEXA_SOUNDS_OF_RAIN_APP_ID} \
  Stage=${ALEXA_SOUNDS_OF_RAIN_STAGE} \
  --capabilities CAPABILITY_IAM \
  --profile xblood

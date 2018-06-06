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
  --parameter-overrides LambdaFunctionVersion=0.01 \
  --capabilities CAPABILITY_IAM \
  --profile handson20180323

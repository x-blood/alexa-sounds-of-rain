terraform {
    required_version = ">= 0.11.11"

    backend "s3" {
        bucket = "alexa-sounds-of-rain-terraform"
        key = "production.tfstate.aws"
        profile = "xblood"
        region = "ap-northeast-1"
    }
}

provider "aws" {
    profile = "xblood"
    region = "ap-northeast-1"
}

resource "aws_s3_bucket" "alexa-sounds-of-rain-cloudfront" {
  bucket = "alexa-sounds-of-rain-cloudfront"
  acl    = "private"
  policy = <<POLICY
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.alexa-sounds-of-rain-cf-origin-access-identity.id}"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::alexa-sounds-of-rain-cloudfront/*"
        }
    ]
}
POLICY
}

resource "aws_s3_bucket" "alexa-sounds-of-rain-cloudfront-logs" {
  bucket = "alexa-sounds-of-rain-cloudfront-logs"
  acl    = "private"
}

resource "aws_cloudfront_origin_access_identity" "alexa-sounds-of-rain-cf-origin-access-identity" {
  comment = "for alexa-sounds-of-rain"
}

resource "aws_cloudfront_distribution" "alexa-sounds-of-rain-cloudfront-distribution" {
  origin {
    domain_name = "alexa-sounds-of-rain-cloudfront.s3.amazonaws.com"
    origin_id   = "S3-alexa-sounds-of-rain-cloudfront"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.alexa-sounds-of-rain-cf-origin-access-identity.cloudfront_access_identity_path}"
    }
  }

  enabled             = true

  logging_config {
    bucket          = "alexa-sounds-of-rain-cloudfront-logs.s3.amazonaws.com"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-alexa-sounds-of-rain-cloudfront"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["JP", "US"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
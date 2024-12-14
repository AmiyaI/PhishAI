##########################################################
# TERRAFORM AND PROVIDER CONFIG
##########################################################

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  # Ensure you have AWS credentials configured locally 
  # via `aws configure` or environment variables.
}
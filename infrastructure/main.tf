##########################################################
# DYNAMODB TABLE - USER INTERACTIONS
##########################################################
resource "aws_dynamodb_table" "user_interactions" {
  name         = "${var.project_name}-${var.environment}-interactions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  attribute {
    name = "user_id"
    type = "S"
  }
}

# Update the IAM role policy to include Bedrock and S3 permissions
resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.project_name}-${var.environment}-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement : [
      {
        Action : "sts:AssumeRole",
        Effect : "Allow",
        Principal : {
          Service : "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Update the custom policy to include Bedrock and S3
resource "aws_iam_policy" "lambda_custom_policy" {
  name        = "${var.project_name}-${var.environment}-lambda-custom"
  description = "Custom policy for Lambda to access needed services"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ],
        Resource : [aws_dynamodb_table.user_interactions.arn]
      },
      {
        Effect : "Allow",
        Action : [
          "polly:SynthesizeSpeech",
          "polly:StartSpeechSynthesisTask",
          "polly:GetSpeechSynthesisTask"
        ],
        Resource : "*"
      },
      {
      Effect = "Allow"
      Action = [
        "bedrock:InvokeModel",
        "bedrock:ListFoundationModels",
        "bedrock:ListCustomModels",
        "bedrock:InvokeModelWithResponseStream"
      ]
      Resource = [
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1",
        "arn:aws:bedrock:us-east-1::foundation-model/*"
      ]
      },
      {
        Effect : "Allow",
        Action : [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket"
        ],
        Resource : [
          "${aws_s3_bucket.audio_files.arn}",
          "${aws_s3_bucket.audio_files.arn}/*"
        ]
      }
    ]
  })
}

# Keep existing policy attachments
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "attach_custom_policy" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.lambda_custom_policy.arn
}

# Add S3 bucket for audio files
resource "aws_s3_bucket" "audio_files" {
  bucket = "${var.project_name}-${var.environment}-audio-files"
}

resource "aws_s3_bucket_cors_configuration" "audio_files_cors" {
  bucket = aws_s3_bucket.audio_files.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"] # In production, restrict to your domain
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Add API Gateway
resource "aws_api_gateway_rest_api" "phishai_api" {
  name        = "${var.project_name}-${var.environment}-api"
  description = "PhishAI API Gateway"
}

resource "aws_api_gateway_resource" "scenario" {
  rest_api_id = aws_api_gateway_rest_api.phishai_api.id
  parent_id   = aws_api_gateway_rest_api.phishai_api.root_resource_id
  path_part   = "scenario"
}

resource "aws_api_gateway_method" "scenario_post" {
  rest_api_id   = aws_api_gateway_rest_api.phishai_api.id
  resource_id   = aws_api_gateway_resource.scenario.id
  http_method   = "POST"
  authorization = "NONE"
}

# Lambda Integration
resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.phishai_api.id
  resource_id = aws_api_gateway_resource.scenario.id
  http_method = aws_api_gateway_method.scenario_post.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

# Update Lambda function with new environment variables
resource "aws_lambda_function" "backend" {
  function_name    = "${var.project_name}-${var.environment}-backend"
  role             = aws_iam_role.lambda_execution_role.arn
  runtime          = "python3.9"
  handler          = "main.lambda_handler"
  filename         = "lambda_package.zip"
  source_code_hash = filebase64sha256("lambda_package.zip")

  environment {
    variables = {
      DYNAMO_TABLE      = aws_dynamodb_table.user_interactions.name
      AUDIO_BUCKET_NAME = aws_s3_bucket.audio_files.id
      ENVIRONMENT       = var.environment
    }
  }
}

# Lambda Permission for API Gateway
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backend.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.phishai_api.execution_arn}/*/*"
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "phishai_deployment" {
  rest_api_id = aws_api_gateway_rest_api.phishai_api.id

  depends_on = [
    aws_api_gateway_integration.lambda_integration
  ]
}

resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.phishai_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.phishai_api.id
  stage_name    = var.environment
}
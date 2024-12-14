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

##########################################################
# IAM ROLE AND POLICY FOR LAMBDA
##########################################################

# IAM Role for Lambda Execution
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

# Attach the basic execution policy so Lambda can write CloudWatch logs
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Custom Policy for Lambda to access DynamoDB, Polly, and optionally S3 if needed
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
        Resource : [
          aws_dynamodb_table.user_interactions.arn
        ]
      },
      # If you store scenario templates or generated audio/images in S3:
      # Add S3 read or write permissions here if needed.
      # {
      #   Effect: "Allow",
      #   Action: ["s3:GetObject"],
      #   Resource: "arn:aws:s3:::your_scenario_bucket/*"
      # },
      {
        Effect : "Allow",
        Action : [
          "polly:SynthesizeSpeech"
        ],
        Resource : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_custom_policy" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.lambda_custom_policy.arn
}

##########################################################
# LAMBDA FUNCTION
##########################################################

resource "aws_lambda_function" "backend" {
  function_name = "${var.project_name}-${var.environment}-backend"
  role          = aws_iam_role.lambda_execution_role.arn
  runtime       = "python3.9"
  handler       = "main.lambda_handler"

  # Provide the path to your Lambda deployment package once built
  # For now, assume a file named lambda_package.zip in your Terraform folder
  filename         = "lambda_package.zip"
  source_code_hash = filebase64sha256("lambda_package.zip")

  environment {
    variables = {
      DYNAMO_TABLE = aws_dynamodb_table.user_interactions.name
      # Add more ENV vars as needed (e.g., scenario bucket name)
    }
  }
}


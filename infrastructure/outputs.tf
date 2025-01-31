##########################################################
# OUTPUTS
##########################################################
output "dynamodb_table_name" {
  description = "Name of the DynamoDB table for user interactions"
  value       = aws_dynamodb_table.user_interactions.name
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.backend.function_name
}

output "api_gateway_url" {
  description = "API Gateway URL for scenario generation"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/scenario"
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for audio files"
  value       = aws_s3_bucket.audio_files.id
}
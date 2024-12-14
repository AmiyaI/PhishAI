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
import json
import os
import boto3
import logging
from botocore.config import Config
from utils.bedrock_client import BedrockClient
from utils.polly_client import PollyClient
from handlers.scenario_handler import ScenarioHandler

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize clients
bedrock_client = BedrockClient()
polly_client = PollyClient()
scenario_handler = ScenarioHandler()

def lambda_handler(event, context):
    """
    Main Lambda handler for PhishAI scenario generation
    """
    try:
        # Extract HTTP method and path
        http_method = event.get('httpMethod', '')
        
        # Parse request body if present
        body = {}
        if event.get('body'):
            body = json.loads(event.get('body', '{}'))
            
        # Generate scenario based on type and level
        scenario_type = body.get('type', 'email')
        level = body.get('level', 1)
        
        # Generate the scenario content using Bedrock
        scenario = scenario_handler.generate_scenario(
            bedrock_client=bedrock_client,
            scenario_type=scenario_type,
            level=level
        )
        
        # If it's a voice scenario, generate audio using Polly
        if scenario_type == 'voice' and scenario.get('script'):
            audio_url = polly_client.generate_speech(
                text=scenario['script'],
                scenario_id=scenario['id']
            )
            scenario['audio_url'] = audio_url
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(scenario)
        }
            
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }

def create_cors_response():
    """
    Create CORS preflight response
    """
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        },
        'body': '{}'
    }
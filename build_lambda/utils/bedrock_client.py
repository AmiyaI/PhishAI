import json
import boto3
import logging
from botocore.config import Config
import uuid

logger = logging.getLogger()

class BedrockClient:
    def __init__(self):
        """Initialize Bedrock client with AWS credentials"""
        self.client = boto3.client('bedrock-runtime')
        self.model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
        
    def generate_text(self, prompt: str) -> dict:
        """
        Generate text using Amazon Bedrock
        """
        try:
            # Prepare the request body
            request_body = {
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an expert in creating realistic phishing scenarios. Generate highly convincing but educational phishing content that will help users learn to identify threats."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }
            
            # Invoke the model
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=json.dumps(request_body)
            )
            
            # Parse and return the response
            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']
            
        except Exception as e:
            logger.error(f"Error generating text with Bedrock: {str(e)}")
            raise
            
    def generate_email_scenario(self, level: int) -> dict:
        """Generate an email phishing scenario"""
        difficulty_context = {
            1: "Create a basic phishing attempt with obvious red flags",
            2: "Create a moderate difficulty phishing attempt",
            3: "Create a sophisticated phishing attempt with subtle indicators",
        }
        
        prompt = f"""
        Create a realistic phishing email scenario for level {level} training.
        Context: {difficulty_context.get(level, difficulty_context[3])}
        
        Format the response as a JSON object with the following structure:
        {{
            "id": "unique-id",
            "type": "email",
            "from": "sender@domain.com",
            "subject": "Email Subject",
            "content": {{
                "title": "Content Title",
                "body": "Main email body",
                "link": "phishing-url.com",
                "footer": "Email signature and footer",
                "contact": "contact@domain.com"
            }},
            "redFlags": ["List of red flags to look for"],
            "isPhishing": true
        }}
        """
        
        response = self.generate_text(prompt)
        scenario = json.loads(response)
        scenario['id'] = f"email-{str(uuid.uuid4())[:8]}"
        return scenario
        
    def generate_voice_scenario(self, level: int) -> dict:
        """Generate a voice phishing scenario"""
        difficulty_context = {
            1: "Create a basic voice phishing script with obvious red flags",
            2: "Create a moderate difficulty voice phishing attempt",
            3: "Create a sophisticated voice phishing script with subtle indicators",
        }
        
        prompt = f"""
        Create a realistic voice phishing (vishing) scenario for level {level} training.
        Context: {difficulty_context.get(level, difficulty_context[3])}
        
        Format the response as a JSON object with the following structure:
        {{
            "id": "unique-id",
            "type": "voice",
            "caller": "Caller's claimed identity",
            "script": "Complete call script with natural dialogue",
            "redFlags": ["List of red flags to look for"],
            "isPhishing": true
        }}
        """
        
        response = self.generate_text(prompt)
        scenario = json.loads(response)
        scenario['id'] = f"voice-{str(uuid.uuid4())[:8]}"
        return scenario
        
    def generate_web_scenario(self, level: int) -> dict:
        """Generate a web phishing scenario"""
        difficulty_context = {
            1: "Create a basic fake website scenario with obvious red flags",
            2: "Create a moderate difficulty fake website scenario",
            3: "Create a sophisticated fake website with subtle indicators",
        }
        
        prompt = f"""
        Create a realistic web phishing scenario for level {level} training.
        Context: {difficulty_context.get(level, difficulty_context[3])}
        
        Format the response as a JSON object with the following structure:
        {{
            "id": "unique-id",
            "type": "web",
            "url": "phishing-url.com",
            "title": "Page Title",
            "content": {{
                "logo": "/path/to/logo.png",
                "formFields": ["username", "password"],
                "submitButton": "Login Button Text"
            }},
            "redFlags": ["List of red flags to look for"],
            "isPhishing": true
        }}
        """
        
        response = self.generate_text(prompt)
        scenario = json.loads(response)
        scenario['id'] = f"web-{str(uuid.uuid4())[:8]}"
        return scenario
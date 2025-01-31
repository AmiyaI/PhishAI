import boto3
import logging
from botocore.exceptions import BotoCoreError, ClientError
import os

logger = logging.getLogger()

class PollyClient:
    def __init__(self):
        """Initialize Polly client with AWS credentials"""
        self.client = boto3.client('polly')
        self.s3_client = boto3.client('s3')
        self.bucket_name = os.environ.get('AUDIO_BUCKET_NAME', 'phishai-audio-files')
        
    def generate_speech(self, text: str, scenario_id: str) -> str:
        """
        Generate speech from text using Amazon Polly and store in S3
        
        Args:
            text: The text to convert to speech
            scenario_id: Unique identifier for the scenario
            
        Returns:
            S3 URL of the generated audio file
        """
        try:
            # Generate speech using Polly
            response = self.client.start_speech_synthesis_task(
                Engine='neural',
                LanguageCode='en-US',
                OutputFormat='mp3',
                OutputS3BucketName=self.bucket_name,
                OutputS3KeyPrefix=f'scenarios/{scenario_id}',
                Text=text,
                VoiceId='Matthew'  # Can be parameterized for different voices
            )
            
            # Get the S3 key of the generated file
            task_id = response['SynthesisTask']['TaskId']
            s3_key = f'scenarios/{scenario_id}/{task_id}.mp3'
            
            # Generate presigned URL for frontend access
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': s3_key
                },
                ExpiresIn=3600  # URL expires in 1 hour
            )
            
            return url
            
        except (BotoCoreError, ClientError) as error:
            logger.error(f"Error generating speech: {str(error)}")
            raise
            
    def get_available_voices(self) -> list:
        """Get list of available Polly voices"""
        try:
            response = self.client.describe_voices(
                Engine='neural',
                LanguageCode='en-US'
            )
            return response['Voices']
        except (BotoCoreError, ClientError) as error:
            logger.error(f"Error getting voices: {str(error)}")
            raise
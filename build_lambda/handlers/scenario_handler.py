import logging
from typing import Dict, Any

logger = logging.getLogger()

class ScenarioHandler:
    def generate_scenario(
        self,
        bedrock_client: Any,
        scenario_type: str,
        level: int
    ) -> Dict[str, Any]:
        """
        Generate a phishing scenario based on type and level
        
        Args:
            bedrock_client: Instance of BedrockClient
            scenario_type: Type of scenario ('email', 'voice', 'web')
            level: Difficulty level (1-5)
            
        Returns:
            Dictionary containing the generated scenario
        """
        try:
            # Normalize level to 1-3 for prompt difficulty
            normalized_level = min(3, max(1, (level + 1) // 2))
            
            # Generate scenario based on type
            if scenario_type == 'email':
                scenario = bedrock_client.generate_email_scenario(normalized_level)
            elif scenario_type == 'voice':
                scenario = bedrock_client.generate_voice_scenario(normalized_level)
            elif scenario_type == 'web':
                scenario = bedrock_client.generate_web_scenario(normalized_level)
            else:
                raise ValueError(f"Invalid scenario type: {scenario_type}")
                
            return scenario
            
        except Exception as e:
            logger.error(f"Error generating scenario: {str(e)}")
            raise
const testScenarioGeneration = async () => {
    try {
      const response = await fetch('https://gml3dcqdwk.execute-api.us-east-1.amazonaws.com/dev/scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'email',
          level: 1
        }),
      });
  
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error testing API:', error);
    }
  };
  
  testScenarioGeneration();
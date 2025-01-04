import React from "react";

function Result({ result }) {
  return (
    <div className="result">
      {result.error ? (
        <p className="error">{result.error}</p>
      ) : (
        <div>
          <h2>Analysis Result:</h2>
          <p>Status: {result.status}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default Result;
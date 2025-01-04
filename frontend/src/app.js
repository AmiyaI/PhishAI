import React, { useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import "./styles.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock API response
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a network request delay
    setTimeout(() => {
      try {
        // Simulated mock response
        const data = {
          status: "Safe",
          confidence: 98,
        };
        setResult(data);
      } catch (error) {
        console.error("Error:", error);
        setResult({ error: "Failed to analyze URL" });
      } finally {
        setLoading(false);
      }
    }, 2000); // 2-second delay to simulate API call
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
        {result && <Result result={result} />}
      </div>
    </div>
  );
}

export default App;
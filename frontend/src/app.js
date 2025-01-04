import React, { useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import "./styles.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://your-api-endpoint.amazonaws.com/analyze-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to analyze URL" });
    } finally {
      setLoading(false);
    }
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
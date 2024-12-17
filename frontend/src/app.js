import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to PhishAI</h1>
      <p style={styles.description}>
        This is the frontend for the PhishAI project. Customize this file to add your application's functionality.
      </p>
    </div>
  );
}

// Simple inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    textAlign: "center",
    maxWidth: "600px",
  },
};

export default App;
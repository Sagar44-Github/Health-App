import React from "react";

const TestApp = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>HealthWise AI - Test Mode</h1>
      <p>If you can see this, the React app is working!</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default TestApp;

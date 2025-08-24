import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleLogin from "./pages/SimpleLogin";

const TestApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h1>HealthWise AI - Home</h1>
              <p>
                Navigate to <a href="/auth/login">/auth/login</a> to test
              </p>
            </div>
          }
        />
        <Route path="/auth/login" element={<SimpleLogin />} />
        <Route
          path="*"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
              <p>
                Go to <a href="/">Home</a> or <a href="/auth/login">Login</a>
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default TestApp;

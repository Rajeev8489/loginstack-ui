"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setIsSuccess(false);
      setMessage("Please enter both username and password.");
      return;
    }

    setMessage("");
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7035/api";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsSuccess(true);
        setMessage("Login successful. Redirecting...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Server connect error. Please ensure the API is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

        {message && (
          <div className={isSuccess ? "success-msg" : "error-msg"}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Authenticating..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}
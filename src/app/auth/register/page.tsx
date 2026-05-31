"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
        return;
      }

      setStatus({ type: "success", message: `Account created for ${data.user.email}!` });
      setEmail("");
      setName("");
      
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus({ type: "error", message: "Failed to connect to the server." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Create an Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username (Optional)</label>
          <br />
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <br />

        <div>
          <label htmlFor="email">Email Address *</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {status.message && (
        <div>
          <p>
            <strong>{status.type === "error" ? "Error: " : "Success: "}</strong>
            {status.message}
          </p>
        </div>
      )}
    </div>
  );
}
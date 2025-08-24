import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Basic configuration
  secret: "your-secret-key-change-in-production",
  baseURL: "http://localhost:8080",

  // Simple database configuration
  database: {
    provider: "sqlite",
    url: "file:./auth.db",
  },

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Simplified for testing
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
});

export type Auth = typeof auth;

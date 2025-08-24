import { createAuthClient } from "better-auth/react";

// Create the auth client for React components
export const authClient = createAuthClient({
  baseURL: "http://localhost:8080",
});

// Export specific hooks and methods for easier imports
export const { signIn, signUp, signOut, useSession } = authClient;

// Types for Better Auth
export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields from our config
  fullName?: string;
  avatar?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  user: User;
};

export default authClient;

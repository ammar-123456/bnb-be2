"use client";

import { ReactNode } from "react";

// Mock user data
const MOCK_USER = {
  id: "mock-user-id-123",
  firstName: "Test",
  lastName: "User",
  emailAddresses: [{ emailAddress: "test@example.com" }],
  imageUrl: "https://via.placeholder.com/150",
  username: "testuser",
};

// Client-side hooks
export const useAuth = ()  => {
  return {
    isSignedIn: true,
    userId: MOCK_USER.id,
    sessionId: "mock-session-id",
    orgId: "mock-org-id",
    orgRole: "admin",
    getToken: async () => "mock-token-xyz",
  };
};

export const useUser = () => {
  return {
    user: MOCK_USER,
    isLoaded: true,
    isSignedIn: true,
  };
};

// Server-side functions
export const auth = () => {
  return {
    userId: MOCK_USER.id,
    sessionId: "mock-session-id",
    getToken: async () => "mock-token-xyz",
  };
};

export const currentUser = async () => {
  return MOCK_USER;
};

// Mock components
export const SignIn = () => {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Mock Sign In</h1>
        <p className="mb-4">This is a mock sign-in page. In a real application, this would be a Clerk sign-in form.</p>
        <p>In this mock implementation, you are automatically signed in as:</p>
        <div className="p-4 bg-gray-100 rounded mt-4">
          <p><strong>Name:</strong> {MOCK_USER.firstName} {MOCK_USER.lastName}</p>
          <p><strong>Email:</strong> {MOCK_USER.emailAddresses[0].emailAddress}</p>
          <p><strong>User ID:</strong> {MOCK_USER.id}</p>
        </div>
        <a href="/" className="block mt-6 text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Mock Sign Up</h1>
        <p className="mb-4">This is a mock sign-up page. In a real application, this would be a Clerk sign-up form.</p>
        <p>In this mock implementation, you are automatically signed up and signed in as:</p>
        <div className="p-4 bg-gray-100 rounded mt-4">
          <p><strong>Name:</strong> {MOCK_USER.firstName} {MOCK_USER.lastName}</p>
          <p><strong>Email:</strong> {MOCK_USER.emailAddresses[0].emailAddress}</p>
          <p><strong>User ID:</strong> {MOCK_USER.id}</p>
        </div>
        <a href="/" className="block mt-6 text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export const UserButton = () => {
  return (
    <div className="relative inline-block">
      <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {MOCK_USER.firstName[0]}
        </div>
      </button>
    </div>
  );
};

export const UserProfile = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mock User Profile</h1>
      <p>This is a mock user profile page.</p>
    </div>
  );
};

// Mock provider
export const ClerkProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

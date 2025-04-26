"use client";

export const UserButton = () => {
  return <button>Login</button>;
};

export const useAuth = () => {
  return {
    isSignedIn: true,
    userId: "mock-user-123",
  };
};

export const useUser = () => {
  return {
    user: {
      id: "mock-user-123",
      firstName: "Mock",
      lastName: "User",
      emailAddresses: [{ emailAddress: "mock@example.com" }],
    },
    isLoaded: true,
    isSignedIn: true,
  };
};

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

import React, { createContext, useContext, useState, ReactNode } from "react";

// Create a context for the user's role
const UserRoleContext = createContext<
  [string | null, React.Dispatch<React.SetStateAction<string | null>>]
>([null, () => {}]);

type UserRoleProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({
  children,
}) => {
  const state = useState<string | null>(null);
  return (
    <UserRoleContext.Provider value={state}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook to use the context
export const useUserRole = () => {
  return useContext(UserRoleContext);
};

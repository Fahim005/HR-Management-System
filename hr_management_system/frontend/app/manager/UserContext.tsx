import { createContext, useContext, ReactNode, useState } from 'react';

interface User {
  id: number;
  Name: string;
  Email: string;
  Gender: string;
  DOB: string;
  PhoneNum: string;
  Password: string;
  userOrganizationTable: {
    id: number;
    organization: {
      id: number;
      Name: string;
      Email: string;
      Password: string;
    };
  };
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

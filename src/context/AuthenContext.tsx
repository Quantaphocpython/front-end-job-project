'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  authUser: any | null;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {}, // Một hàm giả
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthUser(JSON.parse(storedToken));
    }
  }, []); // Chỉ chạy một lần khi component được render

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};


// 'use client'
// import React, { createContext, useContext, useState } from "react";

// interface AuthUser {
//   // Define the shape of authUser object if needed
// }

// interface AuthContextType {
//   authUser: AuthUser | null;
//   setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuthContext = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthContextProvider");
//   }
//   return context;
// };

// export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
//     const storedUser = localStorage.getItem("token");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

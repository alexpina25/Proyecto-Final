import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const userlogin = (data) => {
    const dataString = JSON.stringify(data);
    localStorage.setItem("user", dataString);
    setUser(JSON.parse(dataString));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Se actualiza el estado de user con el valor en localStorage
  // cada vez que el valor en localStorage cambie.
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const value = {
    user,
    setUser,
    userlogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook que nos provee del contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
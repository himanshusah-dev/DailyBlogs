import { createContext, useState, useContext } from "react";

const UserContext = createContext();

// Provider component

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    token: "",
  });

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => useContext(UserContext);

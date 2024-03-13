import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authuser, setauthuser] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);
  const value = {
    authuser,
    setauthuser,
    isloggedin,
    setisloggedin,
  };
  useEffect(() => {
    console.log(authuser); 
    // setauthuser(authuser);
  }, [authuser]);

  useEffect(() => {
    setisloggedin(isloggedin);
    console.log(isloggedin);
  }, [isloggedin]);



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


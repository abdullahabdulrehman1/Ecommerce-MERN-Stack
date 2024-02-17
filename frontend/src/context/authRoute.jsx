// import { data } from "autoprefixer";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// import { useNavigate } from "react-router-dom";

// const StateContext = createContext();
// const DispatchContext = createContext();

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [loading, setLoading] = useState(true); // Add this line
  const [authuser, setauthuser] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);
  const value = {
    authuser,
    setauthuser,
    isloggedin,
    setisloggedin,
  };
  useEffect(() => {
    setauthuser(authuser);
    console.log(authuser); // Logs the updated authuser state
  }, [authuser]);

  useEffect(() => {
    setisloggedin(isloggedin);
    console.log(isloggedin); // Logs the updated isloggedin state
  }, [isloggedin]);

  // Rest of your code...

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useStateContext = () => useContext(StateContext);
// export const useDispatchContext = () => useContext(DispatchContext);

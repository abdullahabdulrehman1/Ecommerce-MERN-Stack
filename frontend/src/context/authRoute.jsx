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

// const initialState = {
//   user: [],
//   token: "",
//   auth: false,
//   role: "0",
//   // tokenexpiration: "",
// };

// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case "set_role":
//       return { ...state, role: payload.role };
//     case "login":
//       return {
//         ...state,
//         user: payload.user,
//         token: payload.token,
//         auth: Boolean(payload.auth),
//         role: payload.role,
//         // tokenexpiration: payload.tokenexpiration,
//       };
//     case "logout":
//       return { initialState };
//     default:
//       throw new Error(`Unknown action type: ${type}`);
//   }
// };

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

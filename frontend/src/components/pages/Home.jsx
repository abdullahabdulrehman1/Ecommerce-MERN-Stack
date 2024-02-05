// import * as React from "react";
import axios from "axios";
import { useAuth, } from "../../context/authRoute";
import Layout from "../layout/layout";
import React, { useEffect, useState } from "react";
import { stringify } from "postcss";
// import { useAuth } from "../../context/authRoute";
// import { useAuth } from "../../context/authRoute";
const Home = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  // const { user, token, auth ,tokenexpiration} = useStateContext();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  console.log(isloggedin);
  console.log(authuser);
  useEffect(() => {
    const Authcheck = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
       
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;

          const res = await axios.get("http://192.168.1.33:5174/user-auth")
          setauthuser(res.data.user);
          setisloggedin(true);
          console.log(res.data);
          console.log(res.data.message);
          console.log(res.data.success);
          console.log(res.data)
          if (res.data.success === true ) {
            setsuccess(true); 
          } else {
            localStorage.removeItem("token");
            setsuccess(false);
              
            // localStorage.removeItem('user');
          }
          
         
            // setsuccess(false);
          
        }
      } catch (err) {
        if (err.response && err.response.data.success === false) {
          localStorage.removeItem("token");
          setsuccess(false);
        }
      } finally {
     
        // setLoading(false);
      }
    };
    Authcheck();
  }, [setauthuser,  setisloggedin,success,token]);
  // constuser = JSON.stringify(authuser)
  const [seconds, setSeconds] = useState(authuser ? authuser.iat : 0);
  
  useEffect(() => {
    let interval = authuser.iat ? null : null;
    if (authuser.iat) {
      interval += setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!authuser.iat && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [authuser, seconds]);
  
  const [leftseconds, setleftSeconds] = useState(authuser ? parseInt(authuser.exp) : 0);
  useEffect(() => {
    let interval = authuser.exp ? null : null;
    if (authuser.exp) {
      interval += setInterval(() => {
        setleftSeconds(()=>authuser.exp - date.getSeconds());
      }, 1000);
    } else if (!authuser.exp && leftseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [authuser, leftseconds]);
  const date = new Date()
  return (
    <Layout title={"Home | Ecommerce"}>
      <main>
        <div className="container mx-auto">
          <h1 className="text-3xl my-6 ">HomePage</h1>
          <h2>LoggedIn: {isloggedin  ? "Logged in" : "Not logged in"}</h2>
          <h2>
            Username: {authuser && authuser.name ? authuser.name : "NOTFOUND"}
          </h2>
          <h2 className="break-all">
            User: {authuser ? JSON.stringify(authuser) : "No user"}
          </h2>
          <p className="break-all">Token: {token ? token : "No token"}</p>
          <h2>Role: {token ? authuser.role : "0"}</h2>
          {/* <h2>Token Expiration: {token ? tokenexpiration : "0"}</h2> */}
          <h2>Question: {authuser ? authuser.question : "NOT Found" }</h2>
          <h2>Creation Time: {authuser ? authuser.iat : "NOT Found" }</h2>
          <h2>Expiration Time: {authuser ? authuser.exp : "NOT Found" }</h2>
          <h2>Elapsed Time: {seconds}</h2>
          <h2> Time Left: {leftseconds}</h2>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinners = ({ String: path }) => {
  // const path = String(path);
  const navigate = useNavigate();
  const [count, setcount] = useState(3);
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((previous) => previous - 1);
    }, 500);
    if (count === 0) {
      if (location.state && location.state.to) {
        navigate(`${path}`);
      } else {
        navigate(`${path}`);
      }
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div>
        <h1 className="flex font-extrabold text-xl text-white mb-10">
          Redirecting you in {count} Seconds
        </h1>
        <div className="flex items-center justify-center ">
          <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinners;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer
      className={`container rounded-lg mx-auto bg-gray-800 my-2 py-5 text-white mt-5`}
    >
      <h1 className="text-center h-10">
        All Right Reserved 2023 © Abdullah Abdul Rehman
      </h1>
      <p className="text-center mt-4">
        <Link to={"/about"} className="mr-3">
          About
        </Link>
        <span className="mr-3">|</span>
        <Link to={"/contact"} className="mr-3">
          Contact
        </Link>
        <span className="mr-3">|</span>
        <Link to={"/policy"} className="mr-3">
          Policy
        </Link>
      </p>
    </footer>
  );
}

export default Footer;

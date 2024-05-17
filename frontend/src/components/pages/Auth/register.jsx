import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import { ToastContainer, toast } from "react-toastify";
import { useRive, useStateMachineInput } from "rive-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import url from "../../../utils/exporturl";
const Register = () => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const { rive, RiveComponent } = useRive({
    src: "520-990-teddy-login-screen.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });
  useEffect(() => {
    import("rive-react").then((rive) => {
      setRiveComponent(() => rive.RiveComponent);
    });
  }, []);
  const variants = {
    initial: { perspective: 0 },
    animate: { perspective: 1000 },
  };
  useEffect(() => {
    setLook();
  }, [FormData]);

  const stateSuccess = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "success"
  );
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "fail");
  const stateHandUp = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "hands_up"
  );

  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, "Check");
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, "Look");

  const triggerSuccess = () => {
    stateSuccess && stateSuccess.fire();
  };
  const triggerFail = () => {
    stateFail && stateFail.fire();
  };

  const setHangUp = (hangUp) => {
    stateHandUp && (stateHandUp.value = hangUp);
  };
  const setLook = () => {
    if (!stateLook || !stateCheck || !setHangUp) {
      return;
    }
    setHangUp(false);
    setCheck(true);

    if (formData.email) {
      let nbChars = 0;

      nbChars = parseFloat(formData.email.split("").length);
      let ratio = nbChars / parseFloat(41);
      console.log("ratio " + ratio);

      let lookToSet = ratio * 100 - 25;
      console.log("lookToSet " + Math.round(lookToSet));
      stateLook.value = Math.round(lookToSet);
    }
  };
  const setCheck = (check) => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    question: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password, question } = formData;
    if (!name || !email || !password || !question) {
      setError("Please fill in all fields.");
      return;
    }

    const data = {
      name,
      question,
      email,
      password,
    };

    const res = axios
      .post(`${url}/auth/register`, data)
      .then((response) => {
        setFormData({
          name: "",
          email: "",
          password: "",
          question: "",
        });
        toast.success("Registration successful!");
        setError("");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setError(`${error.response.data.message}`);
      });
  };
  const [popLayout, setPopLayout] = useState(false);

  return (
    <Layout title={"Registeration | Ecommerce"}>
      <div className="  light:bg-white-500">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto md:h-5/6  lg:py-0">
          <AnimatePresence
            AnimatePresence
            mode={popLayout ? "popLayout" : "sync"}
          >
            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              variants={variants}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 "
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create an account
                </h1>
                <div
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RiveComponent
                    style={{
                      width: "350px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src="520-990-teddy-login-screen.riv"
                  />
                </div>

                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      typeof="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(event) => {
                        handleChange(event);
                        setLook();
                      }}
                      className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(event) => {
                        handleChange(event);
                        setLook();
                      }}
                      className="block name w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onFocus={() => setHangUp(false)}
                      onMouseLeave={() => setHangUp(false)}
                      onChange={(event) => {
                        handleChange(event);
                        setHangUp(true);
                      }}
                      className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Security Question
                    </label>
                    <input
                      type="question"
                      name="question"
                      id="question"
                      placeholder="What is your favourite color?"
                      value={formData.question}
                      onChange={handleChange}
                      className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                  <h1>
                    {" "}
                    {error && (
                      <span className="text-red-500 text-lg font-bold ">
                        {error}
                      </span>
                    )}
                  </h1>
                  <button>
                    {" "}
                    <h1
                      className="ml-1 text-sm  font-bold font-serif w-full  "
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      have account{" "}
                      <span className="underline   text-md font-semibold">
                        Login Now
                      </span>{" "}
                    </h1>
                  </button>
                  <div>
                    <button
                      onMouseOver={() => setHangUp(false)}
                      onFocus={() => setHangUp(false)}
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full py-3 text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                    >
                      Create account
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

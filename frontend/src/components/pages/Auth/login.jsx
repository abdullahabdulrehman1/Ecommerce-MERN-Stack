import Layout from "../../layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Toast } from "flowbite-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authRoute";
import { useRive, useStateMachineInput } from "rive-react";
import url from "../../../utils/exporturl";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const Login = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const STATE_MACHINE_NAME = "State Machine 1";
  const { rive, RiveComponent } = useRive({
    src: "520-990-teddy-login-screen.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });
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
    let nbChars = 0;
    if (formData.email) {
      nbChars = parseFloat(formData.email.split("").length);
    }

    let ratio = nbChars / parseFloat(41);
    console.log("ratio " + ratio);

    let lookToSet = ratio * 100 - 25;
    console.log("lookToSet " + Math.round(lookToSet));
    stateLook.value = Math.round(lookToSet);
  };
  const setCheck = (check) => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  // const { user, token } = useStateContext();
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatchContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    // Check if name, email, and password are not empty
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setError("Please fill in all fields.");
      return;
    }
    // triggerSuccess();

    try {
      // const res = await axios.post(`${url}/auth/login`, formData);
      console.log(url);
      const res = await axios.post(`${url}/auth/login`, formData);
// triggerSuccess();
      // <Spinners />
      if (res && res.data.success === true) {
        triggerSuccess();
        setError(`${res.data.message}`);
        setLoading(false);
        setauthuser(res.data.user);
        setisloggedin(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        //  console.log(res.data.user);
        console.log(authuser);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        toast.success("Login Success");

        // console.log(tokenexpiration);
      } else {
        setauthuser([]);
        setisloggedin(false);
        triggerFail();

        setError(`${res.data.message}`);
      }
    } catch (error) {
      triggerFail();
      setError(`${error.response.data.message}`);
    }
  };

  return (
    <Layout title={"Login | Ecommerce"}>
      <div className=" light:bg-white-500">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto md:h-4/6 md:my-0  lg:py-0">
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
                Login
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
                    // objectFit: "cover",
                  }}
                  src="520-990-teddy-login-screen.riv"
                />
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                    onFocus={() => setHangUp(false)}
                    onChange={(event) => {
                      handleChange(event);
                      setLook();
                    }}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required={true}
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
                    onChange={(event) => {
                      handleChange(event);
                      setHangUp(true);
                    }}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-lg font-bold ">{error}</div>
                )}

                <button>
                  {" "}
                  <h1
                    className="ml-1 text-sm font-bold font-serif w-full  "
                    onClick={() => {
                      navigate("/forgotpassword");
                    }}
                  >
                    Forgot Password{" "}
                  </h1>
                </button>
                <div>
                  <button
                    onMouseOver={() => setHangUp(false)}
                    onFocus={() => setHangUp(false)}
                    type="submit"
                    className="w-full py-3 text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;

import Layout from "../../layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { Toast } from "flowbite-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authRoute";
import url from "../../../utils/exporturl";
const Login = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

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

    try {
      // const res = await axios.post(`${url}/auth/login`, formData);
      console.log(url)
      const res = await axios.post(`${url}/auth/login`, formData);
      
      // <Spinners />
      if (res && res.data.success === true) {
        setError(`${res.data.message}`);
        setLoading(false);
       setauthuser(res.data.user);
       setisloggedin(true);
       
       
       navigate("/");
      //  console.log(res.data.user);
       console.log(authuser);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
       
        toast.success("Login Success");

        // console.log(tokenexpiration);
      } else {
        setauthuser([]);
        setisloggedin(false);
        setError(`${res.data.message}`);
      }
    } catch (error) {
      setError(`${error.response.data.message}`);
    }
   
  };

  return (
    <Layout title={"Login | Ecommerce"}>
      <div className=" light:bg-white-500">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto md:h-5/6 md:my-20 lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6  text-2xl font-semibold text-gray-900 "
          >
            <img
              className="w-8 h-8 mr-2 rounded-3xl"
              src="/public/aboutus.jpg"
              alt="logo"
            />
            Ecommerce
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Login
              </h1>
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
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
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
                    onChange={handleChange}
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
                    type="submit"
                    className="w-full py-3 text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;

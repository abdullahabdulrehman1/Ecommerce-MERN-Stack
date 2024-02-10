// import { useStateContext } from "../../../context/authRoute";
import { useAuth } from "../../../context/authRoute.jsx";
import AdminMenu from "../../layout/adminmenu";
import Layout from "../../layout/layout.jsx";

const AdminDashboard = () => {
  // const {user} = useStateContext();
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  return (
    <Layout title={"Ecommerce | Admin-Dashboard"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="lg:col-span-3 sm:col-span-12 row-span-1 border "><AdminMenu/></div>
          <div className="lg:col-span-9 sm:col-span-12 px-10 py-1"><h1>{authuser?.email}</h1><h1>{authuser?.id}</h1></div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
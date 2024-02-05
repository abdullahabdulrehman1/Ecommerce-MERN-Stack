import { useAuth } from "../../../context/authRoute";
import Layout from "../../layout/layout";
import UserMenu from "../../layout/usermenu";
// import { useStateContext } from "../../../context/authRoute";
const UserDashboard = () => {
  // const {user} = useStateContext();
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  return (
    <div>
      <Layout title={"Ecommerce | User-Dashboard"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border "><UserMenu/></div>
          <div className="col-span-9  px-10 py-1"><h1>{authuser?.email}</h1><h1>{authuser?.id}</h1><h1>{authuser?.role}</h1></div>
        </div>
      </div>
      </Layout>
    </div>
  );
};
export default UserDashboard;

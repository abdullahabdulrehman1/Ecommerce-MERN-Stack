import { useAuth } from "../../../context/authRoute.jsx";
import AdminMenu from "../../layout/adminmenu";
import Layout from "../../layout/layout.jsx";
import { Container, Grid, Typography, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
const AdminDashboard = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-auto justify-between">
          <div className="lg:col-span-3 md:col-span-3 col-span-12 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col ml-10 flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            <Box p={1}>
              <Typography variant="h6">{authuser?.email}</Typography>
              <Typography variant="h6">{authuser?.id}</Typography>
            </Box>
            {/* </Grid> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

import { useAuth } from "../../../context/authRoute.jsx";
import AdminMenu from "../../layout/adminmenu";
import Layout from "../../layout/layout.jsx";
import { Container, Grid, Typography, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
const AdminDashboard = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  return (
    <Layout title={"Ecommerce | Admin-Dashboard"}>
      <Container fixed maxWidth="false">
        <Stack
          direction={{ lg: "row", md: "column", sm: "column" }}
          alignItems={"center"}
          justifyContent={{ lg: "start", sm: "center" }}
        >
          {/* <Grid item xs={12} sm={6} md={3} sx={{border: "50px solid black"}} > */}
          <Box>
            <AdminMenu />
          </Box>
          {/* </Grid> */}
          {/* <Grid item xs={12} sm={6} md={9}> */}
          <Box p={1}>
            <Typography variant="h6">{authuser?.email}</Typography>
            <Typography variant="h6">{authuser?.id}</Typography>
          </Box>
          {/* </Grid> */}
        </Stack>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;

import React from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from '../../layout/adminmenu.jsx'
// import Adminmenu from '../../layout/adminmenu.jsx'
const User = () => {
  return (
    <Layout title={"Dashboard | All Users"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="col-span-9  px-10 py-1">
            <h1>ALL Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;

import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="">
      <div className="text-center">
        <div className="list-group ">
          <h1 className="font-extrabold py-5">Admin Panel</h1>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action block border"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action block border"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/allusers"
            className="list-group-item list-group-item-action block border"
          >
            ALL Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default AdminMenu;

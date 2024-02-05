import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="">
      <div className="text-center">
        <div className="list-group ">
          <h1 className="font-extrabold py-5">User Panel</h1>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action block border"
          >
           All Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action block border"
          >
            Profile
          </NavLink>
          
        </div>
      </div>
    </div>
  );
};
export default UserMenu;

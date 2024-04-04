import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then(() => {
        alert("Logout Success!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-circle avatar btn-primary"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <div className="w-10 h-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={"/update-profile"}>Profile</Link>
            </li>
            <li>
              <a>orders</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

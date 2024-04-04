import React from "react";
import { FaBorderAll } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BiNavigation } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer md:drawer-open translate-y-4 ">
          <input
            id="my-drawer-2"
            type="checkbox"
            className="drawer-toggle drawer-open"
          />
          <div className="drawer-content flex flex-col items-center justify-center my-2 ">
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <FaBorderAll />
              </label>
              <button className="btn btn-outline btn-sx sm:btn-sm lg:btn-lg sm:hidden flex items-center gap-2 btn-info">
                <FaUser /> Logout
              </button>
            </div>
            <div className="w-full h-full">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <Link to={"/dashboard"}>
                <div className="flex flex-row items-center ">
                  <img src="/logo.png" alt="" className="h-20 mx-0" />

                  <button className="btn btn-sm btn-primary rounded-full">
                    Admin
                  </button>
                </div>
              </Link>
              {/* Sidebar content here */}
              <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-300"></hr>
              <li className="border-0">
                <a>
                  <FaBorderAll />
                  Dashboard
                </a>
              </li>
              <li>
                <a>
                  <BsBagCheckFill />
                  Manage Orders
                </a>
              </li>
              <li>
                <Link to={"/dashboard/addProduct"}>
                  <IoMdAddCircle />
                  Add Product
                </Link>
              </li>
              <li>
                <Link to={"./product"}>
                  <HiTemplate />
                  Manage Item
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/usersList"}>
                  <FaUserEdit />
                  All Users
                </Link>
              </li>
              <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-300"></hr>
              <li>
                <Link to={"/"}>
                  <FaHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to={"./product"}>
                  <FaCartShopping />
                  Product
                </Link>
              </li>
              <li>
                <a>
                  <BiNavigation />
                  Order Tracking
                </a>
              </li>
              <li>
                <a>
                  <MdContactSupport />
                  Customer Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <img
            className="h-4/5 w-4/5 mx-auto"
            src="https://image.thepeople.co/uploads/2020/01/%E0%B8%95%E0%B8%B1%E0%B9%8A%E0%B8%81-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%9A%E0%B8%B9%E0%B8%A3%E0%B8%93%E0%B9%8C_Website_1200x628.jpg"
          />
          <Link to={"/"} className="btn btn-lg btn-error">
            กลับไปหน้าแรก
          </Link>
        </div>
      )}
    </div>
  );
};

export default Admin;

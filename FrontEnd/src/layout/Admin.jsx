import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Admin from "../pages/admin/admin";
import "../App.css"

const Admin = () => {
  return (
    <div>
      <Admin />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Admin;
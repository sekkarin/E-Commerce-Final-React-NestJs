import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isAdmin, isAdminLoading] = useAdmin();
  if (user && isAdmin) {
    return <Outlet />;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminRoute;

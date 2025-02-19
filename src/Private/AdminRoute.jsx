import React from "react";
import Loading from "../components/Loading";
import useRole from "../hook/useRole";
import { Navigate } from "react-router-dom";

export default function AdminRoute({children}) {
  const [roles, isLoading] = useRole();

  if (isLoading) {
    return <Loading></Loading>;
  }
  const role = roles?.role;
  if (role == "admin") {
    return children;
  }

  return <Navigate to={"/Dashboard"} replace="true"></Navigate>;
}

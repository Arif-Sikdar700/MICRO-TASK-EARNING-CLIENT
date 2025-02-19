import React from "react";
import useRole from "../../hook/useRole";
import Loading from "../../components/Loading";

import { Navigate } from "react-router-dom";

export default function DynamicHome() {
  const [roles, isLoading] = useRole();
  const role = roles?.role;
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role === "worker") return <Navigate to="/Dashboard/workerHome" />;
  if (role === "buyer") return <Navigate to="/Dashboard/buyerHome" />;

  return (
    <div>{role === "admin" && <Navigate to="/Dashboard/adminHome" />} </div>
  );
}

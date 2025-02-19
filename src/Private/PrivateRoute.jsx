import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  console.log(user)
  if (loading) {
    <Loading></Loading>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}

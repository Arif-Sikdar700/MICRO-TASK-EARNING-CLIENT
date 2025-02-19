import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useAuth() {
  const user = useContext(AuthContext);
  return user;
}

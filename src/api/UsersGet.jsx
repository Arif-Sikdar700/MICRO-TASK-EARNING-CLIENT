import React from "react";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";

export default function UsersGet() {
  const asiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();
  const {
    data: usersData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
  
    queryFn: async () => {
      try {
        const { data } = await asiosPublic.get("/users");

        return data;
      } catch (error) {}
    },
  });

  return { usersData, isLoading, isError, refetch };
}

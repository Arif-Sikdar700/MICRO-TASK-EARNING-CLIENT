import React from "react";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function userData() {
  const { user,loading } = useAuth();
  console.log(user?.email);
  const asiosPublic = useAxiosPublic();

  const {
    data: usersData = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    // enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const { data } = await asiosPublic.get(`/user/${user?.email}`);
       
        return data;
      } catch (error) {}
    },
  });
  return { usersData, refetch };
}

import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "./../components/Loading";

export default function useRole() {
  const { user, loading } = useAuth();

  const axiosPublic = useAxiosPublic();
  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic(`/role/${user?.email}`);

      return data;
    },
  });

  return [roles, isLoading];
}

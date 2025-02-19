import React, { useEffect, useState } from "react";
import useAxiosPublic from "./../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../hook/useAuth";
import Loading from "../../../components/Loading";
import WithdrawRequest from "../../../components/Admin/WithdrawRequest";

export default function AdminHome() {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["adminHomeCount", user?.email],
    
    queryFn: async () => {
      const { data } = await axiosPublic.get("/adminHomeCount");

      return data;
    },
  });

  return (
    <div className="mx-10 my-10">
      <div>
        <div className="stats  space-x-3 ">
          <div className="stat">
            <div className="stat-title font-bold">TotalWorker</div>
            <div className="stat-value text-center">{data?.totalWorker}</div>
          </div>
        </div>
        <div className="stats  space-x-3 mx-10 my-10">
          <div className="stat">
            <div className="stat-title font-bold ">TotalBuyer</div>
            <div className="stat-value text-center">{data?.totalBuyer}</div>
          </div>
        </div>
        <div className="stats  space-x-3 mx-10 my-10">
          <div className="stat">
            <div className="stat-title font-bold ">TotalCoins</div>
            <div className="stat-value text-center">{data?.totalCoins}</div>
          </div>
        </div>
        <div className="stats  space-x-3 mx-10 my-10">
          <div className="stat">
            <div className="stat-title font-bold ">Withdraw Amoun</div>
            <div className="stat-value text-center">{data?.withdrawAmount}</div>
          </div>
        </div>
      </div>
      <WithdrawRequest></WithdrawRequest>
    </div>
  );
}

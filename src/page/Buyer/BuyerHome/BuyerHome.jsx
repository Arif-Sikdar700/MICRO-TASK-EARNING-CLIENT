import React from "react";
import TaskToReview from "../TaskToReview/TaskToReview";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

export default function BuyerHome() {
  const {user, loading} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {data:buyerCount = {}} = useQuery({
    queryKey:["buyerhome", user?.email],
    enabled: !loading && !!user?.email,
    queryFn:async()=>{
      const {data} = await axiosSecure(`/buyerHomeAllCount/${user?.email}`)
      console.log(data)
      return data
    }
  })

  return (
    <div>
      <div className="flex gap-4 my-10 mx-5">
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">Total Task</div>
          <div className="stat-value text-black">{buyerCount?.taskCount}</div>
        </div>
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">Pending Task</div>
          <div className="stat-value text-black">{buyerCount?.totalTask}</div>
        </div>
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">Total Payment</div>
          <div className="stat-value text-black">{buyerCount?.totalRequiredWorkers}</div>
        </div>
      </div>
      <TaskToReview></TaskToReview>
    </div>
  );
}

import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Loading from "../Loading";

export default function WorkerApproved() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: workerApprove, isLoading } = useQuery({
    queryKey: ["workerapprove", user?.email],
    // enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/workerWithdraw/${user?.email}?status=approve`
      );

      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-white font-bold">
            <th>Title</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workerApprove?.map((worker) => {
            return (
              <tr key={worker._id}>
                <th>{worker.task_title}</th>
                <td>{worker.payable_amount}</td>
                <td>{worker.buyer.name}</td>
                <td>{worker.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import WorkerApproved from "../../../components/Worker/WorkerApproved";

export default function WorkerHome() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: workercount } = useQuery({
    queryKey: ["workerHome", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/workerHomeAdmin/${user?.email}`);

      return data;
    },
  });

  return (
    <div className="my-10 mx-5">
      <div className="flex gap-4 ">
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">Total Submission</div>
          <div className="stat-value text-black">
            {workercount?.totalSubmission}
          </div>
        </div>
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">
            Total pending <br /> submission
          </div>
          <div className="stat-value text-black">
            {workercount?.totalpendingsubmission}
          </div>
        </div>
        <div className="stat place-items-center w-48 bg-white">
          <div className="stat-title text-black">Total Earning</div>
          <div className="stat-value text-black">
            {workercount?.withdrawAmount}
          </div>
        </div>
      </div>
      <div>
        <WorkerApproved></WorkerApproved>
      </div>
    </div>
  );
}

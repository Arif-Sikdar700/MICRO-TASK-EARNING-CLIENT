import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";

export default function MySubmissions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  let arr = Array.from({ length: 5 });
  const [page, setPage] = useState(0);
  const { data: submissiondata = [], isLoading, refetch } = useQuery({
    queryKey: ["taskSubmission", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submit_task/${user?.email}?page=${page}`);
      return data;
    },
  });
 
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleClick = (value) => {
    setPage(value);
    refetch()
  };
  return (
    <div className="overflow-x-auto my-5">
      <table className="table table-xs ">
        <thead className="text-center">
          <tr className="text-white font-semibold">
            <th>Serial</th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {submissiondata?.map((submission, i) => {
            const currentDate = format(
              Date(submission?.completion_date),
              "dd/MM/yyyy"
            );
            const lastDate = format(
              Date(submission.current_date),
              "dd/MM/yyyy"
            );
            return (
              <tr key={submission._id}>
                <th>{i + 1}</th>
                <td>{submission.worker.name}</td>
                <td>{submission.worker.email}</td>
                <td>{submission.task_title}</td>
                <td>{currentDate}</td>
                <td>{lastDate}</td>
                <td>
                  <button
                    className={`px-2 rounded ${
                      submission.status == "pending"
                        ? "bg-yellow-400"
                        : "bg-green-600"
                    }`}>
                    {submission.status}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="join flex justify-center my-10">
        {arr.map((newArr, i) => {
          return (
            <button
              key={i}
              onClick={() => handleClick(i + 1)}
              className="join-item btn">
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

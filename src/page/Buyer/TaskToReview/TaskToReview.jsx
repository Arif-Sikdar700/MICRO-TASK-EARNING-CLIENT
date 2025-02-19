import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { format } from "date-fns";
import BuyerModal from "../../../components/modal/BuyerModal";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import Loading from "./../../../components/Loading";

export default function TaskToReview() {
  const { user } = useAuth();
  const [disables, setDisables] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    data: task = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["taskReview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/taskReviw/${user.email}?status=${"pending"}`
      );
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>
  }
  const handleView = () => {
    document.getElementById("my_modal_5").showModal();
  };
  const handleRequest = async (value, email, id, amount, taskId) => {
    setDisables(true);
    const { data } = await axiosPublic.patch(`/submit_task`, {
      email,
      id,
      value,
      amount,
      taskId,
    });
    refetch();
  };

  return (
    <>
      <table className="table table-xs ">
        <thead className="text-center">
          <tr className="text-white font-semibold">
            <th>Serial</th>
            <th>Worker Name</th>
            <th>task_title </th>
            <th>payable_amount</th>
            <th>View Submission</th>
            <th>Actionable</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {task?.map((submission, i) => {
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
                <td>{submission.task_title}</td>
                <td>{submission.payable_amount}</td>
                <td>
                  <button
                    onClick={handleView}
                    className="px-3 py-2 rounded-md bg-green-700">
                    View Submissions
                  </button>
                </td>

                <td>
                  <select
                    disabled={disables}
                    defaultValue={"defult"}
                    onChange={(e) =>
                      handleRequest(
                        e.target.value,
                        submission.worker.email,
                        submission._id,
                        submission.payable_amount,
                        submission.task_id
                      )
                    }
                    className=" select select-bordered select-xs bg-green-400 text-black max-w-xs">
                    <option disabled value={"defult"}>
                      {" "}
                      Select Request
                    </option>
                    <option value={"approve"}>Approve </option>
                    <option value={"reject"}>Reject </option>
                  </select>
                </td>
                <td>
                  <BuyerModal submission={submission}></BuyerModal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

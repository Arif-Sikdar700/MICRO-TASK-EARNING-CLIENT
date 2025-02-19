import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useCalculateCoin from "../../../api/useCalculateCoin";
import Update from "../modal/BuyerUpdate";
import { Link } from "react-router-dom";

// import "sweetalert2/src/sweetalert2.scss";
export default function MyTask() {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/task/${user?.email}`);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleDelte = async (id, worker, payamount) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/task/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
          const totalPaypalAmount = parseInt(worker) * parseInt(payamount);
         
          const [updateCoin] = await useCalculateCoin(
            user.email,
            totalPaypalAmount,
            "increase"
          );
        } catch (error) {
          toast.error("error.message");
        }
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-auto mx-4 my-4">
      <table className="table">
        {/* head */}
        <thead className="text-center">
          <tr className="text-white font-semibold">
            <th>Name & Photo</th>
            <th>Email</th>
            <th>Title</th>
            <th>Completion_date</th>
            <th>Pay Amount</th>
            <th>workers</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tasks.map((task) => {
          
            return (
              <tr key={task._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={task.buyer.photourl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>

                    <div className="font-bold">{task.buyer.name}</div>
                  </div>
                </td>

                <td>{task.buyer.email}</td>
                <td>{task.title}</td>
                <td>{task.completion_date}</td>
                <td>{task.payable_amount}</td>
                <td>{task.required_workers}</td>
                <td>
                  <Link to={`/Dashboard/buyerUpdate/${task?._id}`}>
                    <button className="btn btn-warning  btn-xs">Update</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDelte(
                        task?._id,
                        task.required_workers,
                        task.payable_amount
                      )
                    }
                    className="btn btn-warning  btn-xs">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

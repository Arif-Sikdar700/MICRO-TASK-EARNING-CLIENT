import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
export default function AdminManageTask() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: tasks, refetch } = useQuery({
    queryKey: ["adminTask", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/admintask");
   
      return data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const { data } = await axiosSecure.delete(`/admintaskDelete/${id}`);
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        refetch();
      }
    });
    
  };
  return (
    <div className="overflow-x-auto mx-10 my-10">
      <table className="table table-xs">
        <thead className="text-white font-bold text-center">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Payable_amount</th>
            <th>required_workers</th>
            <th>Title</th>
            <th>Completion_date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tasks?.map((task) => {
            const date = format(new Date(task?.completion_date), "MM/dd/yyyy");
            return (
              <tr key={task?._id} className="">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={task.buyer.photourl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{task?.buyer.name}</td>
                <td>{task?.buyer.email}</td>
                <td>{task?.payable_amount}</td>
                <td>{task?.required_workers}</td>
                <td>{task?.title}</td>
                <td>{task?.completion_date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task?._id)}
                    className="bg-red-600 px-2 py-2 rounded-md ">
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

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosPublic from "./../../../hook/useAxiosPublic";
import toast from "react-hot-toast";
export default function BuyerUpdate() {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();

  const { data: task = {} } = useQuery({
    queryKey: ["task", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/taskss/${id}`);
      
      return data;
    },
  });

  const onSubmit = async (data) => {
    const updateInfo = {...data}
   
    try {
      const {data} =await axiosPublic.patch(`/updateTask/${id}`, updateInfo)
      if (data.modifiedCount) {
        toast.success("Task update Success!")
      }
   
    } catch (error) {
      
    }
  };
  return (
    <div className="min-h-screen text-black bg-[#04151F]">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-white font-bold md:text-4xl md:mx-6 py-4">
          Update Task
        </h3>
        <div className="grid md:grid-cols-2 md:gap-6 mx-6">
          {/* task_title */}
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text text-white">Task_title</span>
              </div>
              <input
                defaultValue={task.title}
                type="text"
                placeholder={"Enter Your Title"}
                className="input input-bordered w-full "
                {...register("title", { required: true })}
              />
            </label>
          </div>

          {/* completion_date */}
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text text-white">completion_date</span>
              </div>
              <input
                type="date"
                defaultValue={task.completion_date}
                placeholder={"Enter Your payable_amount"}
                className="input input-bordered w-full "
                {...register("completion_date", { required: true })}
              />
            </label>
          </div>

          {/* task_detail   */}
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text text-white">task_detail </span>
              </div>
              <textarea
                defaultValue={task.task_detail}
                {...register("task_detail", { required: true })}
                className="textarea textarea-warning"
                placeholder="task_detail"
              />{" "}
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn my-4 mx-6 btn-warning">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}

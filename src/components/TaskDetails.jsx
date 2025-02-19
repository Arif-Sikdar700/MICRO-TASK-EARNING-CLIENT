import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function TaskDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["taskDetail", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/taskss/${id}`);
      
      return data;
    },
  });

  const {
    _id,
    title,
    image,
    completion_date,
    payable_amount,
    required_workers,
    submission_info,
    task_detail,
  } = task || {};


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const submitInfo = {
      image:image,
      task_id: _id,
      task_title: title,
      required_workers:required_workers ,
      payable_amount: payable_amount,
      submission_Details: data.submission_Details,
      worker: {
        email: user?.email,
        name: user?.displayName,
      },
      buyer: {
        email: task?.buyer?.email,
        name: task?.buyer?.name,
      },
      current_date: new Date(),
      completion_date: completion_date,
      status: "pending",
    };
   
    try {
      const res = await axiosSecure.post("/submit_task?worker=decrease", submitInfo);
      if (res.data.acknowledged) {
        toast.success("task submission success");
        navigate("/Dashboard/workerSubmission");
      }
    } catch (error) {
 
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="grid  md:grid-cols-2 mx-3 my-5 md:gap-5">
      <div className="space-y-3">
        <figure>
          <img src={task.image} alt="" className="rounded-md" />
        </figure>
        {/* content */}
        <div>
          <h3>
            {" "}
            <span className="text-2xl uppercase font-semibold text-[#FFBE00]">
              {task.title}
            </span>
          </h3>
          <p>
            <b>completion_date</b> : {new Date(completion_date).toDateString()}
          </p>
          <p>
            <b>payable_amount</b> : {payable_amount}
          </p>
          <p>
            <b>required_workers</b> : {required_workers}
          </p>
          <p>
            <b>submission_info</b> : {submission_info}
          </p>
          <p>
            <b>Buyer_Email</b> : {task?.buyer?.email}
          </p>
          <p>
            <b>Buyer_Name</b> : {task?.buyer?.name}
          </p>
        </div>
      </div>
      {/* form section */}

      <div>
        <div className="space-y-3">
          {/* worker details */}
          <p>
            <b>Worker_Name</b>: {user?.displayName}
          </p>
          <p>
            <b>Worker_email</b>: {user?.email}
          </p>
        </div>
        {/* work form */}
        <form action="" className="my-5 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3 ">
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-[#FFBE00] font-semibold">
                    submission_Details
                  </span>
                </div>
                <textarea
                  {...register("submission_Details", { required: true })}
                  className="textarea textarea-black text-black font-semibold"
                  placeholder="submission_Details"
                />{" "}
              </label>
            </div>
            <input
              type="submit"
              className="btn w-32 btn-warning justify-self-start"
              value="submission"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

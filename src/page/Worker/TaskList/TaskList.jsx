import React from "react";

import WorkerCard from "../../../components/WorkerCard/WorkerCard";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

export default function TaskList() {
  const axiosSecure = useAxiosSecure();
  const {
    data: AllTask=[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/taskAll");
      
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="grid md:grid-cols-3 mx-4 gap-6 my-4">
      {AllTask?.map((task) => {
        return <WorkerCard key={task._id} task={task}></WorkerCard>;
      })}
    </div>
  );
}

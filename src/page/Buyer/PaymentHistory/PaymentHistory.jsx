import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { format } from "date-fns";

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory, refetch } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/paymentHistory/${user?.email}`);
     
      
      return data;
    },
  });
  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-white font-semibold text-center">
            <th>Name</th>
            <th>Email</th>
            <th>Transition</th>
            <th>Transition Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory?.map((history) => {
         
            const currentDate = format(
              new Date(history.transtion_date),
              "dd-MM-yyyy"
            );
            const currentTime = format(
              new Date(history.transtion_date),
              "hh:mm a"
            );
          
            return (
              <tr key={history._id} className="text-center">
                <td>{history.name}</td>
                <th>{history.email}</th>
                <td>{history.transtion_id}</td>
                <td>{currentTime} {currentDate} </td>
              </tr>
              
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

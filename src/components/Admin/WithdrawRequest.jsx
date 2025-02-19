import React, { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Loading from "../Loading";
import toast from "react-hot-toast";

export default function WithdrawRequest() {
  const axiosSecure = useAxiosSecure();
  const {user,loading} = useAuth()

  const {
    data: withdreaws,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["withdreaw"],

    queryFn: async () => {
      const { data } = await axiosSecure("/workerWithdraw");
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const withdrawalRequest = async (value, coin, id, email) => {
    try {
      const { data } = await axiosSecure.patch("/withdrawalRequest", {
        status: value,
        coin: coin,
        id: id,
        email: email,
      });
      if (data.modifiedCount > 0) {
        toast.success("Payment Success");
        refetch();
      }
    } catch (error) {}
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead className="text-white font-bold">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Withdraw Amount</th>
            <th>payment_system</th>
            <th>account_number</th>
            <th>withdraw_date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdreaws?.map((withdreaw) => {
            return (
              <tr key={withdreaw?._id}>
                <th>{withdreaw?.worker_email}</th>
                <td>{withdreaw?.worker_name}</td>
                <td>${withdreaw?.withdrawal_amount}</td>
                <td>{withdreaw?.payment_system}</td>
                <td>{withdreaw?.account_number}</td>
                <td>{withdreaw?.withdraw_date}</td>
                <td>
                  <select
                    disabled={withdreaw.status == "approve" ? true : false}
                    defaultValue={"defult"}
                    onChange={(e) =>
                      withdrawalRequest(
                        e.target.value,
                        withdreaw?.withdrawal_coin,
                        withdreaw?._id,
                        withdreaw?.worker_email
                      )
                    }
                    className=" select select-bordered select-xs bg-green-400 text-black max-w-xs">
                    <option value={"defult"} disabled>
                      {" "}
                      Payment
                    </option>
                    <option value={"approve"}>Approve </option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

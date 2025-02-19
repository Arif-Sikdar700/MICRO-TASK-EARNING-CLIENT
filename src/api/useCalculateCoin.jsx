import React from "react";
import useAxiosPublic from "../hook/useAxiosPublic";

export default async function useCalculateCoin(email, totalPaypalAmount,status) {
  const axiosPublic = useAxiosPublic();
  const { data: updateCoin} = await axiosPublic.patch(`/coin/update/${email}`, {
    totalPaypalAmount,status
  });

  return [updateCoin];
}

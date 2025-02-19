import React from "react";
import Carosel from "../../components/Carosel";
import { Testimonials } from "../../components/Testimonials";
import UsersGet from "../../api/UsersGet";
import Loading from "../../components/Loading";
import UserCard from "../../components/card/UserCard";
import HowItWorks from "../../components/HowItWorks";
import EarningsCalculator from "../../components/EarningsCalculator";

export default  function Home() {
  const { usersData, isLoading } =  UsersGet();

 
  return (
    <div>
      <Carosel></Carosel>
      <div className="grid md:grid-cols-4 gap-4 my-10">
        {usersData.map((user) => {
          return <UserCard user={user} key={user._id}></UserCard>;
        })}
      </div>
      <Testimonials></Testimonials>
      <HowItWorks></HowItWorks>
      <EarningsCalculator></EarningsCalculator>
    </div>
  );
}

import React from "react";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import userData from "../../api/userData";

export default function DashBoardNavBar() {
  const { usersData } = userData();
  const { coin, email, name, image, role } = usersData;
  return (
    <>
      <div className="navbar justify-between text-white backdrop-blur shadow-md sticky top-0 z-10 bg-[#04151F]">
        <Link to={"/"} className="btn btn-ghost text-xl">
          {" "}
          <h1 className=" md:text-2xl md:font-bold animate__animated animate__rollIn">
            Micro Tasking & <span className="text-[#F3A712]">Earning </span>
          </h1>
        </Link>
        <div className="grid grid-rows-2 grow-1">
          <ul className="flex gap-8 ">
            <li>{coin}</li>
            <li>{email}</li>
          </ul>
          <ul className="flex gap-8 ">
            <li>{role}</li>
            <li>{name}</li>
          </ul>
        </div>
        <div className="mx-10">
          <IoNotifications className="text-2xl outline outline-offset-8 outline-1" />
        </div>
      </div>
    </>
  );
}

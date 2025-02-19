import React from "react";
import { NavLink } from "react-router-dom";
import AddNewTask from "../form/AddNewTask";

export default function BuyerMenu() {
  return (
    <ul className="space-y-4 flex md:flex-col  menu">
      <li>
        <NavLink to={"/Dashboard/buyerHome"}>Home</NavLink>
      </li>
    
      <li>
        <NavLink to={"/Dashboard/addnewtask"}>Add New Task</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/mytask"}>My Task’s</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/buyerWithDrawal"}>Purchase Coin</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/paymentHistory"}>Payment History</NavLink>
      </li>
    </ul>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <ul className="space-y-4 flex md:flex-col  menu">
      <li>
        <NavLink to={"/dashboard/adminHome"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/adminManageUser"}>Manage Users</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/adminManageTask"}>Manage Task</NavLink>
      </li>
    </ul>
  );
}

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function WorkerMenu() {
  return (
    <ul className="space-y-4 flex md:flex-col  menu">
      <li>
        <NavLink to={"/Dashboard/workerHome"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/workertasklist"}>TaskList</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/workerSubmission"}>My Submissions</NavLink>
      </li>
      <li>
        <NavLink to={"/Dashboard/workerWithDrawal"}>withdrawals</NavLink>
      </li>
    </ul>
  )
}

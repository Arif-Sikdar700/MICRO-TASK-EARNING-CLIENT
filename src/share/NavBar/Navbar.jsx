import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "animate.css";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../context/AuthProvider";
import userData from "../../api/userData";


export default function Navbar() {
  const { user, userLogout } = useContext(AuthContext);
 const {usersData} = userData()


  const navigate = useNavigate();
  const links = (
    <div className="md:flex items-center">
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"https://github.com/Arifsikdar7000"} target="_blank">
          Join as Developer
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/profile"}>
              <CgProfile className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <div className="indicator w-28">
              <span className="indicator-item badge badge-warning">
                {usersData?.coin}
              </span>
              <button className="btn bg-warning">MY Coin</button>
            </div>
          </li>
        </>
      ) : (
        ""
      )}
    </div>
  );

  const handleLogout = () => {
    userLogout();
    navigate("singin");
  };
  return (
    <div className="navbar z-10  sticky top-0 backdrop-blur my-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl ">
          <h1 className=" md:text-2xl md:font-bold animate__animated animate__rollIn">
            Micro Tasking & <span className="text-[#F3A712]">Earning </span>
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button className="btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              title={"Arif"}
              to={"/singin"}
              className={"btn btn-warning"}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

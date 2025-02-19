import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import userData from "../../api/userData";



export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const {usersData} = userData()
  const { image, name, email, _id, role } = usersData;
  console.log(image);
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gradient-to-r w-1/2 h-52 rounded-t-md from-slate-900 to-slate-700"></div>
      <div className="w-1/2 h-52 flex justify-center items-center bg-gray-100 rounded-b-md relative">
        <div className="avatar absolute top-0 -translate-y-2/4 ">
          <div className="ring-lime-100  w-24 rounded-full ring ring-offset-2 ring-offset-gradient-to-r from-indigo-200 to-yellow-100">
            <img src={image} />
          </div>
        </div>
        <div className="space-y-2">
          <h3>
            <b>UserName: </b>
            {name}
          </h3>
          <h3>
            <b>UserRole: </b>
            {role}
          </h3>
          <h3>
            <b>UserEmail: </b>
            {email}
          </h3>
        </div>
      </div>
    </div>
  );
}

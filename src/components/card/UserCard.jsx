import React from "react";

export default function UserCard({ user }) {
  const { _id, role, name, image, email, coin } = user;
  
  return (
    <div className="card bg-[#04151F] text-white  shadow-xl">
      <figure>
        <img className="h-40 w-40 my-5 rounded-full" src={image} alt="image" />
      </figure>
      <div className="mx-auto uppercase">
        <h3 className="font-bold mx-auto text-2xl">{name}</h3>
      </div>
      <div className="mx-5 my-5">
        <p>
          <b>Email: </b>
          {email}
        </p>
        <p>
          <b>Avilable_coin: </b>
          {coin}
        </p>
      </div>
    </div>
  );
}

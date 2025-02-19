import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
export default function WorkerCard({ task }) {
  const {
    _id,
    title,
    image,
    completion_date,
    payable_amount,
    required_workers,
  } = task || {};
  const formattedDate = format(completion_date, "dd/MM/yyyy");

  return (
    <div className="card card-compact text-[#04151F] bg-[#f8ffe5]  shadow-xl">
      <figure>
        <img src={image} alt={title} className="h-full max-h-52 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          <b>completion_date</b>: {formattedDate}
        </p>
        <p>
          <b>payable_amount</b>: {payable_amount}
        </p>
        <p>
          <b>required_workers</b>: {required_workers}
        </p>
        <div className="card-actions ">
          <Link to={`/Dashboard/taskDetail/${_id}`}>
            <button className="btn btn-warning">View All Data</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

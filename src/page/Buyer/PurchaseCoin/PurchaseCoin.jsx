import React from "react";
import { Link } from "react-router-dom";
import StribePayment from "../../../components/Payment/StribePayment";

export default function PurchaseCoin() {
  return (
    <div className="mx-10 my-10 flex gap-6 ">
      <Link to={`/Dashboard/buyerWithDrawal/StribePayment/${1}`}>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title text-black ">10 Coins</div>
            <div className="stat-value">1$</div>
            
          </div>
        </div>
      </Link>
      <Link to={`/Dashboard/buyerWithDrawal/StribePayment/${10}`}>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title text-black">150 Coins</div>
            <div className="stat-value">10$</div>
            
          </div>
        </div>
      </Link>
      <Link to={`/Dashboard/buyerWithDrawal/StribePayment/${20}`}>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title text-black">500 Coins</div>
            <div className="stat-value">20$</div>
           
          </div>
        </div>
      </Link>
      <Link to={`/Dashboard/buyerWithDrawal/StribePayment/${35}`}>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title text-black">1000 Coins</div>
            <div className="stat-value">35$</div>
            
          </div>
        </div>
      </Link>
    </div>
  );
}

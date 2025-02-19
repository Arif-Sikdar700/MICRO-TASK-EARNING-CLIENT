import React, { useState } from "react";
import useRole from "../../../hook/useRole";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const WithdrawalForm = () => {
  const [roles, isloading] = useRole();
  
  const axiosSecure = useAxiosSecure()
  const coins = roles?.coin;
  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Select Paymet System");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [isInsufficient, setIsInsufficient] = useState(false);

  const handleCoinChange = (e) => {
    const coinsToWithdraw = parseInt(e.target.value);
    setCoinToWithdraw(coinsToWithdraw);

    if (coinsToWithdraw > coins) {
      setIsInsufficient(true);
      toast.error("Insufficient coin");
    } else {
      setIsInsufficient(false);
      setWithdrawalAmount(coinsToWithdraw / 20); 
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (coinToWithdraw > 501) {
      toast.error("maximum value 500");
      return;
    }
    
    const withdrawalData = {
      worker_email: roles.email,
      worker_name: roles.name, 
      withdrawal_coin: Number(coinToWithdraw),
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: Number(accountNumber),
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };
    try {
      const {data}= await axiosSecure.post("/workerWithdraw", {withdrawalData})
      if (data.acknowledged) {
        toast.success("withdraw pending please wait....")
      }
    } catch (error) {
      
    }

  
    
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Withdrawal Form
      </h2>

      <div className="mb-4">
        <label
          htmlFor="coinToWithdraw"
          className="block text-sm font-medium text-gray-700">
          Coin To Withdraw
        </label>
        <input
          type="number"
          id="coinToWithdraw"
          className="w-full p-2 mt-1 bg-gray-100 text-gray-700 rounded-md"
          value={coinToWithdraw}
          onChange={handleCoinChange}
          min="1"
          max={coins}
        />
      </div>
      {coinToWithdraw < 501 ? (
        ""
      ) : (
        <p className="text-red-600">Maximum Value 500</p>
      )}
      <div className="mb-4">
        <label
          htmlFor="withdrawAmount"
          className="block text-sm font-medium text-gray-700">
          Withdraw Amount ($)
        </label>
        <input
          type="text"
          id="withdrawAmount"
          className="w-full p-2 mt-1 bg-gray-100 text-gray-700 rounded-md"
          readOnly
          value={withdrawalAmount}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="paymentSystem"
          className="block text-sm font-medium text-gray-700">
          Select Payment System
        </label>
        <select
          id="paymentSystem"
          className="w-full p-2 mt-1 bg-gray-100 text-gray-700 rounded-md"
          value={paymentSystem}
          onChange={(e) => setPaymentSystem(e.target.value)}>
          <option disabled>Select Paymet System</option>
          <option value="Bkash">Bkash</option>
          <option value="Rocket">Rocket</option>
          <option value="Nagad">Nagad</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="accountNumber"
          className="block text-sm font-medium text-gray-700">
          Account Number
        </label>
        <input
          type="text"
          id="accountNumber"
          className="w-full p-2 mt-1 bg-gray-100 text-gray-700 rounded-md"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        {isInsufficient ? (
          <p className="text-red-600">Insufficient coin</p>
        ) : (
          <button
            onClick={handleSubmit}
            className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            disabled={coinToWithdraw === 0 || coinToWithdraw > coins}>
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawalForm;

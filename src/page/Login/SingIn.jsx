import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import singin from "../../assets/lottie/singin.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

export default function SingIn() {
  const { userSingIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    userSingIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Sucessful");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
    reset();
  };

  const goBack = () => {
    navigate("/"); // Go back to the previous page
  };
  
  return (
    <>
      <div className="min-h-screen bg-[#04151F]">
        <div className="max-w-6xl mx-auto py-6 ">
          <button className="btn mx-5" onClick={goBack}>
            Go to Home
          </button>
        </div>
        <div className="max-w-6xl mx-5  md:mx-auto grid md:grid-cols-2 gap-4  justify-center items-center">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-white font-bold md:text-4xl my-4">SingIn</h3>
            <div className="">
              {/* name */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder={"Enter Your Name"}
                    className="input input-bordered w-full "
                    {...register("email", { required: true })}
                  />
                </label>
              </div>
              {/* password */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">Password</span>
                  </div>
                  <input
                    type="password"
                    placeholder={"Enter Your Password"}
                    className="input input-bordered w-full "
                    {...register("password", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="btn my-4 btn-warning">
                Register
              </button>
            </div>
            
            <h3 className="text-white">
              Are You New user ?
              <Link to={"/singup"} className="text-[#FFBE00]">
                {" "}
                Register
              </Link>
            </h3>
          </form>
          <div className="my-0">
            <Lottie animationData={singin} />
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import singup from "../../assets/lottie/singup.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import usePostImage from "../../hook/usePostImage";
import useAxiosPublic from "./../../hook/useAxiosPublic";

export default function SingUp() {
  const { userSingUp, userUpdateProfile, googleLogin, user } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.photourl[0] };
    const photoURL = await usePostImage(imageFile);
  
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(data.password)) {
      toast.error("please one uppercase & lowercase & number and six crecter");
      return;
    }
    userSingUp(data.email, data.password)
      .then(async (result) => {
        userUpdateProfile({ displayName: data.name, photoURL });
        try {
          const userInfo = {
            name: data.name,
            email: data.email,
            image: photoURL,
            role: data.role,
            coin: data.role == "worker" ? 10 : 50,
          };
          await axiosPublic.post(`/users/${userInfo.email}`, userInfo);
        } catch (error) {
          toast.error(error.message)
        }
        toast.success("Account Create Successful");
        navigate("/Dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    reset();
  };
  const goBack = () => {
    navigate("/"); // Go back to the previous page
  };
  const handleGoogle = () => {
    googleLogin()
      .then(async (result) => {
        try {
          const userInfo = {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            role: "worker",
            coin: 10,
          };
          await axiosPublic.post(`/users/${userInfo.email}`, userInfo);
          
        } catch (error) {
          toast.error(error.message);
        }
        toast.success("Account Login Success");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className="min-h-screen bg-[#04151F]">
        <div className="max-w-6xl mx-auto py-4">
          <button className="btn" onClick={goBack}>
            Go Back
          </button>
        </div>
        <div className="max-w-6xl mx-5  md:mx-auto grid md:grid-cols-2 gap-4  justify-center items-center">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-white font-bold md:text-4xl my-4">SingUp</h3>
            <div className="">
              {/* name */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder={"Enter Your Name"}
                    className="input input-bordered w-full "
                    {...register("name", { required: true })}
                  />
                </label>
              </div>
              {/* email */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder={"Enter Your Email"}
                    className="input input-bordered w-full "
                    {...register("email", { required: true })}
                  />
                </label>
              </div>
              {/* Photo */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">PhotoUrl</span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-warning  w-full "
                    {...register("photourl", { required: true })}
                  />
                </label>
              </div>
              {/* DropDown */}
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-white">Role</span>
                  </div>
                  <select
                    defaultValue={"role"}
                    className="select select-bordered "
                    {...register("role")}>
                    <option disabled value="role">
                      Select Your Role
                    </option>
                    <option value="worker">Worker</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </label>
              </div>
              {/* email */}
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
            <div className="divider">OR</div>
            <button
              onClick={handleGoogle}
              className="btn btn-success w-full my-3 text-white">
              Google Login
            </button>
            <h3 className="text-white flex justify-center">
              Allready Accout ?
              <Link to={"/singin"} className="text-[#FFBE00]">
                {" "}
                Login
              </Link>
            </h3>
          </form>
          <div className="my-0">
            <Lottie animationData={singup} />
          </div>
        </div>
      </div>
    </>
  );
}

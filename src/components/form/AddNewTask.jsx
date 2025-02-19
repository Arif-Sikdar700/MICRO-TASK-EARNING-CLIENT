import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import usePostImage from "../../hook/usePostImage";

import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import useCalculateCoin from "../../api/useCalculateCoin";

export default function AddNewTask() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const totalPaypalAmount =
      parseInt(data.required_workers) * parseInt(data.payable_amount);

    if (totalPaypalAmount > usersData.coin) {
      toast.error(`Not available Coin.  Purchase Coin`);
      return;
    }
    const imageFile = { image: data.photourl[0] };
    const image = await usePostImage(imageFile);
    const userInfo = {
      ...data,

      payable_amount: parseInt(data.payable_amount),
      required_workers: parseInt(data.required_workers),
      image,
      buyer: {
        name: user.displayName,
        email: user.email,
        photourl: user.photoURL,
      },
    };
    try {
      const { data } = await axiosSecure.post("/addTask", { userInfo });
      if (data.acknowledged) {
        const [updateCoin] = await useCalculateCoin(
          user?.email,
          totalPaypalAmount,
          "decrease"
        );
        refetch();
        toast.success("task add success !");
      }
    } catch (error) {
      toast.error(error.message);
    }
    navigate("/Dashboard/mytask")
    reset()
  };

  return (
    <>
      <div className="min-h-screen text-black bg-[#04151F]">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-white font-bold md:text-4xl md:mx-6 py-4">
            Add New Task
          </h3>
          <div className="grid md:grid-cols-2 md:gap-6 mx-6">
            {/* task_title */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">Task_title</span>
                </div>
                <input
                  type="text"
                  placeholder={"Enter Your Title"}
                  className="input input-bordered w-full "
                  {...register("title", { required: true })}
                />
              </label>
            </div>
            {/* required_workers */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">
                    required_workers
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  placeholder={"Enter Your required_workers"}
                  className="input input-bordered w-full "
                  {...register("required_workers", { required: true })}
                />
              </label>
            </div>
            {/* payable_amount */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">payable_amount</span>
                </div>
                <input
                  min={0}
                  type="number"
                  placeholder={"Enter Your payable_amount"}
                  className="input input-bordered w-full "
                  {...register("payable_amount", { required: true })}
                />
              </label>
            </div>
            {/* completion_date */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">completion_date</span>
                </div>
                <input
                  type="date"
                  placeholder={"Enter Your payable_amount"}
                  className="input input-bordered w-full "
                  {...register("completion_date", { required: true })}
                />
              </label>
            </div>
            {/* submission_info   */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">
                    submission_info{" "}
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={"screenshot"}
                  placeholder={"Enter Your submission_info "}
                  className="input input-bordered w-full "
                  {...register("submission_info ")}
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
            {/* task_detail   */}
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text text-white">task_detail </span>
                </div>
                <textarea
                  {...register("task_detail", { required: true })}
                  className="textarea textarea-warning"
                  placeholder="task_detail"
                />{" "}
              </label>
            </div>
          </div>
          <div>
            <button type="submit" className="btn my-4 mx-6 btn-warning">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

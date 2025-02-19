
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
export default function AdminManageuser() {
  const { user,loading } = useAuth();
  let arr = Array.from({ length: 15 });

  const axiosSecure = useAxiosSecure();

  const { data: users, refetch, isLoading } = useQuery({
    queryKey: ["userAdmin", user?.email],
    enabled:!loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/adminallUser/${user?.email}`
      );

      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const { data } = await axiosSecure.delete(`/userDeleteAdmin/${id}`);
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    refetch();
  };
  
  const handleUpdateRole = async (value, email) => {
    const { data } = await axiosSecure.patch(
      `/adminRoleChange/${email}?role=${value}`
    );
    toast.success("Role Update Sucess");
    refetch();
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className="text-center">
          <tr className="text-white font-bold">
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Coin</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* row 1 */}
          {users?.map((user) => {
            return (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user?.image} alt={user?.name} />
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.coin}</td>
                <td>{user?.role}</td>
                <th>
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className=" bg-warning btn-xs mx-2 rounded text-black">
                    remove{" "}
                  </button>
                  <select
                    defaultValue={"role"}
                    onChange={(e) => handleUpdateRole(e.target.value, user?.email)}
                    className="select select-bordered select-xs w-24 text-black bg-green-500">
                    <option disabled value={"role"}>
                      Selected Role
                    </option>
                    <option value={"worker"}>Worker</option>
                    <option value={"buyer"}>Buyer</option>
                    <option value={"admin"}>Admin</option>
                  </select>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

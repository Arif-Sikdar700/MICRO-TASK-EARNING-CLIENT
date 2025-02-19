import { Link, NavLink, Outlet } from "react-router-dom";
import AdminMenu from "../../components/menu/AdminMenu";
import BuyerMenu from "../../components/menu/BuyerMenu";
import Footer from "../../share/Footer/Footer";
import useAuth from "../../hook/useAuth";
import DashBoardNavBar from "../../share/DashBoardNavBar.jsx/DashBoardNavBar";
import WorkerMenu from "./../../components/menu/WorkerMenu";

import Loading from "../../components/Loading";
import useRole from "../../hook/useRole";
export default function Dashboard() {
  const { user } = useAuth();
  const [roles, isLoading] = useRole();

  if (isLoading) {
    return <Loading></Loading>;
  }

  const role = roles?.role;

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex justify-between min-h-7">
        <DashBoardNavBar></DashBoardNavBar>
      </div>
      <div className=" grid md:grid-cols-6  ">
        <div className="md:col-span-1 row-span-2 bg-warning  ">
          {role === "admin" ? <AdminMenu></AdminMenu> : ""}
          {role === "buyer" ? <BuyerMenu></BuyerMenu> : ""}
          {role === "worker" ? <WorkerMenu></WorkerMenu> : ""}
        </div>
        <div className="md:col-span-5 bg-[#04151F] text-white min-h-[calc(100vh-294px)]">
          <Outlet />
        </div>

        <div className="md:col-span-5">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

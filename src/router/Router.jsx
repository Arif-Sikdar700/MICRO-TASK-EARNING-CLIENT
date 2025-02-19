import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../page/Home/Home";
import SingUp from "../page/SingUp/SingUp";
import Dashboard from "../layout/Dashboard/Dashboard";
import SingIn from "../page/Login/SingIn";
import UserProfile from "../page/Profile/UserProfile";

import AddNewTask from "../components/form/AddNewTask";
import DynamicHome from "../page/DynamicHome/DynamicHome";
import MyTask from "../page/Buyer/myTask/MyTask";
import BuyerUpdate from "../page/Buyer/modal/BuyerUpdate";
import TaskList from "../page/Worker/TaskList/TaskList";
import TaskDetails from "../components/TaskDetails";
import MySubmissions from "../page/Worker/MySubmissions/MySubmissions";

import AdminHome from "../page/Admin/AdminHome/AdminHome";
import AdminManageuser from "../page/Admin/AdminManageuser/AdminManageuser";
import AdminManageTask from "../page/Admin/AdminManageTask/AdminManageTask";
import WorkerHome from "../page/Worker/WorkerHome/WorkerHome";
import BuyerHome from "../page/Buyer/BuyerHome/BuyerHome";
import WorkerWithDrawal from "../page/Worker/workerWithDrawal/WorkerWithDrawal";
import PurchaseCoin from "../page/Buyer/PurchaseCoin/PurchaseCoin";
import StribePayment from "../components/Payment/StribePayment";
import PaymentHistory from "../page/Buyer/PaymentHistory/PaymentHistory";
import WorkerRoute from "../Private/WorkerRoute";
import ErrorPage from "../share/Error/ErrorPage";
import PrivateRoute from "../Private/PrivateRoute";
import AdminRoute from "./../Private/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "singup",
    element: <SingUp></SingUp>,
  },
  {
    path: "singin",
    element: <SingIn></SingIn>,
  },
  {
    path: "Dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // buyer
      {
        path: "buyerHome",
        element: <BuyerHome></BuyerHome>,
      },
      {
        path: "addnewtask",
        element: <AddNewTask></AddNewTask>,
      },

      {
        path: "buyerUpdate/:id",
        element: <BuyerUpdate></BuyerUpdate>,
      },
      {
        path: "mytask",
        element: <MyTask></MyTask>,
      },
      {
        index: true,
        element: <DynamicHome></DynamicHome>,
      },
      {
        path: "buyerWithDrawal",
        element: <PurchaseCoin></PurchaseCoin>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "buyerWithDrawal/StribePayment/:amount",
        element: <StribePayment></StribePayment>,
      },
      // worker
      {
        path: "workertasklist",
        element: (
          <WorkerRoute>
            <TaskList></TaskList>
          </WorkerRoute>
        ),
      },
      {
        path: "taskDetail/:id",
        element: (
          <WorkerRoute>
            <TaskDetails></TaskDetails>
          </WorkerRoute>
        ),
      },
      {
        path: "workerSubmission",
        element: (
          <WorkerRoute>
            <MySubmissions></MySubmissions>
          </WorkerRoute>
        ),
      },
      {
        path: "workerHome",
        element: (
          <WorkerRoute>
            <WorkerHome></WorkerHome>
          </WorkerRoute>
        ),
      },
      {
        path: "workerWithDrawal",
        element: (
          <WorkerRoute>
            <WorkerWithDrawal></WorkerWithDrawal>
          </WorkerRoute>
        ),
      },
      // admin
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "adminManageUser",
        element: (
          <AdminRoute>
            <AdminManageuser></AdminManageuser>
          </AdminRoute>
        ),
      },
      {
        path: "adminManageTask",
        element: (
          <AdminRoute>
            <AdminManageTask></AdminManageTask>
          </AdminRoute>
        ),
      },
    ],
  },
]);

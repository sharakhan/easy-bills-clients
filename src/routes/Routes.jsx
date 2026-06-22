import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import MainLayout from "../layout/MainLayout";
import Bills from "../Pages/Bills";
import BillDetails from "../Pages/BillDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import ForgotPassword from "../Pages/ForgotPassword";
import MyPayBills from "../Pages/MyPayBills";
import Error404 from "../Pages/Error404";
import ProtectedRoute from "../Components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // ======================
      // BILLS
      // ======================
      {
        path: "bills",
        element: <Bills />,
      },

      // ======================
      // BILL DETAILS
      // ======================
      {
        path: "bill-details/:id",
        element: (
          <ProtectedRoute>
            <BillDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-pay-bills",
        element: (
          <ProtectedRoute>
            <MyPayBills />
          </ProtectedRoute>
        ),
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
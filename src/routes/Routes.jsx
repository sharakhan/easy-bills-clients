import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import MainLayout from "../layout/MainLayout";
import Bills from "../Pages/Bills";

import BillDetails from "../Pages/BillDetails";
import { Suspense } from "react";
import Loading from "../Components/Loading";
import ProtectedRoute from "../Components/ProtectedRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import ForgotPassword from "../Pages/ForgotPassword";
import MyPayBills from "../Pages/MyPayBills";
import Error404 from "../Pages/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bills",

        loader: () => fetch(import.meta.env.VITE_CLIENT_URL),
        element: (
          <Suspense fallback={<Loading />}>
            <Bills />
          </Suspense>
        ),
      },
      {
        path: "/bill-details/:id",
        loader: ({ params }) =>
         
          fetch(`${import.meta.env.VITE_CLIENT_URL}${params.id}`),
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <BillDetails />
            </ProtectedRoute>
          </Suspense>
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
        element: <MyPayBills />,
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
        path: "/*",
        Component:Error404,
      },
    ],
  },
]);

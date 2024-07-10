import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import NotFound from "../NotFound/NotFound";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/ManageItems/UpdateItem";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // normal user Route
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <ProtectedRoute>
            <PaymentHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },

      //admin Routes
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "update-item/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
      },

      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

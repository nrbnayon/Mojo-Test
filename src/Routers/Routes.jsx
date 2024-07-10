import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import NotFound from "../NotFound/NotFound";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import GuestRoute from "./GuestRoute";
import Home from "../Pages/Home/Home";

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
    ],
  },
]);
